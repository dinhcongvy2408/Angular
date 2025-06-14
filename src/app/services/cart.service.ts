import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, forkJoin, throwError } from 'rxjs';
import { Product } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';
    
interface CartItemResponse { // Đây là một ví dụ DTO tương ứng với backend
  id: number;
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
  images: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private apiUrl = 'http://localhost:8080/api/cart'; 
  private currentUserId: number | null = null

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const localCart = savedCart ? JSON.parse(savedCart) : [];
    this.cartItems = localCart;
    this.cartSubject.next(this.cartItems);
    console.log('Loaded cart from local storage:', this.cartItems);
  }

  private loadCartFromServer(userId: number): Observable<Product[]> {
    console.log('Attempting to load cart from server for userId:', userId);
    if (!userId) {
      console.warn('loadCartFromServer: No userId provided, returning empty cart.');
      return of([]);
    }
    const url = `${this.apiUrl}/user/${userId}`;
    console.log('Calling backend API:', url);
    return this.http.get<any>(url).pipe( 
      switchMap(apiResponse => {
        console.log('Raw response from backend (apiResponse):', apiResponse);
        if (apiResponse && apiResponse.result && Array.isArray(apiResponse.result)) {
            const cartItemResponses: CartItemResponse[] = apiResponse.result;
            const productsInCart = cartItemResponses.map(this.convertCartItemResponseToProduct);
            console.log('Products converted from cartItemResponses:', productsInCart);
            return of(productsInCart);
        } else {
            console.error('Invalid API response format for cart items:', apiResponse);
            return of([]);
        }
      }),
      catchError(error => {
        console.error('Lỗi khi tải giỏ hàng từ server:', error);
        return of([]);
      })
    );
  }

  private convertCartItemResponseToProduct(item: CartItemResponse): Product {
    console.log('Converting cart item response to product:', item);
    return {
      id: item.productId,
      name: item.productName,
      price: item.productPrice,
      quantity: item.quantity,
      images: item.images
    };
  }

  mergeLocalCartWithServerCart(userId: number): Observable<Product[]> {
    this.currentUserId = userId; 
    console.log('Merging local cart with server cart for userId:', userId);
    const localCart = this.getCartFromLocalStorage();
    console.log('Local cart before merging:', localCart);

    return this.loadCartFromServer(userId).pipe(
      switchMap(initialServerCartItems => { // Cart DB trước khi gộp
        const mergedCartItems: Product[] = [...initialServerCartItems]; // Bắt đầu với các item từ server
        localCart.forEach(localItem => {
          const existingServerItem = mergedCartItems.find(item => item.id === localItem.id);
          if (existingServerItem) {
            existingServerItem.quantity = (existingServerItem.quantity ?? 0) + (localItem.quantity ?? 0);
          } else {
            mergedCartItems.push({ ...localItem });
          }
        });

        console.log('Merged cart items (before sync to server):', mergedCartItems);

        this.cartItems = mergedCartItems; 
        this.updateCart(); 

        const syncRequests: Observable<any>[] = [];

        mergedCartItems.forEach(itemToSync => {
          const originalServerItem = initialServerCartItems.find(item => item.id === itemToSync.id);

          if (originalServerItem) {
            console.log('Updating existing server item:', itemToSync.id, 'quantity:', itemToSync.quantity);
            syncRequests.push(this.http.put(`${this.apiUrl}/update/${this.currentUserId}`, { 
              productId: itemToSync.id!,
              quantity: itemToSync.quantity ?? 0 
            }));
          } else {
            console.log('Adding new item to server cart:', itemToSync.id, 'quantity:', itemToSync.quantity);
            syncRequests.push(this.http.post(`${this.apiUrl}/add/${this.currentUserId}`, { 
              productId: itemToSync.id!,
              quantity: itemToSync.quantity ?? 0 
            }));
          }
        });
        if (syncRequests.length > 0) {
          return forkJoin(syncRequests).pipe(
            tap(() => console.log('All merged cart items synced to server successfully.')),
            catchError(error => {
                console.error('Error syncing merged cart items to server:', error);
                return throwError(() => error); 
            }),
            switchMap(() => of(mergedCartItems)) 
          );
        } else {
          console.log('No sync requests needed, returning merged cart items.');
          return of(mergedCartItems);
        }
      }),
      catchError(error => {
        console.error('Lỗi trong quá trình gộp hoặc đồng bộ tổng thể:', error);
        this.loadCartFromLocalStorage(); 
        throw error; 
      })
    );
  }

  private getCartFromLocalStorage(): Product[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }
  private syncCartItemToServer(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${userId}`, { productId, quantity });
  }

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existing = this.cartItems.find(p => p.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity ?? 0) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.updateCart();

    if (this.currentUserId) {
      const itemToSync = this.cartItems.find(item => item.id === product.id);
      if (itemToSync) {
        this.syncCartItemToServer(this.currentUserId, itemToSync.id!, itemToSync.quantity ?? 0).subscribe();
      }
    }
  }

  getCart(): Product[] {
    return this.cartItems;
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();

    if (this.currentUserId) {
      this.http.delete(`${this.apiUrl}/remove/${this.currentUserId}/${productId}`).subscribe();
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();

      if (this.currentUserId) {
        this.http.put(`${this.apiUrl}/update/${this.currentUserId}`, { productId: item.id!, quantity: item.quantity ?? 0 }).subscribe();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();

    if (this.currentUserId) {
      this.http.delete(`${this.apiUrl}/clear/${this.currentUserId}`).subscribe();
    }
  }

  clearCartLocal(): void {
    this.cartItems = [];
    this.updateCart();
    this.currentUserId = null; // Đặt lại userId khi clear local cart
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }
  createOrder(orderData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/orders', orderData);
  }
}
