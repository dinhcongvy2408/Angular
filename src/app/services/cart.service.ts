import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { Product, BackendCartItem } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
import { CartItem } from '../models/cart.model';
    

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private apiUrl = 'http://localhost:8080/api/cart';
  private username: string | null = null;

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const localCart = savedCart ? JSON.parse(savedCart) : [];
    this.cartItems = localCart;
    this.cartSubject.next(this.cartItems);
  }

  private loadCartFromServer(): Observable<any[]> {
    if (!this.username) {
      return new Observable(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }
    return this.http.get<any[]>(`${this.apiUrl}?username=${this.username}`);
  }

  private convertBackendCartItemToProduct(item: any): Product {
    return {
      id: item.productId,
      name: item.productName,
      price: item.productPrice,
      quantity: item.quantity,
      images: item.images
    };
  }

  mergeLocalCartWithServerCart(username: string): Observable<Product[]> {
    this.username = username;
    const localCart = this.getCartFromLocalStorage();

    return this.loadCartFromServer().pipe(
      switchMap(serverCartItems => {
        const mergedCartItems: Product[] = serverCartItems.map(this.convertBackendCartItemToProduct);

        localCart.forEach(localItem => {
          const existingServerItem = mergedCartItems.find(item => item.id === localItem.id);
          if (existingServerItem) {
            existingServerItem.quantity = (existingServerItem.quantity ?? 0) + (localItem.quantity ?? 0);
          } else {
            mergedCartItems.push({ ...localItem });
          }
        });

        this.cartItems = mergedCartItems;
        this.updateCart();

        const syncRequests = mergedCartItems.map(item => {
          const cartItem = {
            username: this.username!,
            productId: item.id!,
            quantity: item.quantity ?? 0
          };
          return this.syncCartItemToServer(cartItem);
        });

        if (syncRequests.length > 0) {
          return forkJoin(syncRequests).pipe(switchMap(() => of(mergedCartItems)));
        } else {
          return of(mergedCartItems);
        }
      }),
      catchError(error => {
        console.error('Lỗi trong quá trình gộp hoặc đồng bộ:', error);
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

  private syncCartItemToServer(cartItem: { username: string; productId: number, quantity: number }): Observable<any> {
    if (!this.username) {
      return of(null);
    }
    return this.http.post(`${this.apiUrl}/add`, cartItem);
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

    if (this.username) {
      const itemToSync = this.cartItems.find(item => item.id === product.id);
      if (itemToSync) {
        this.syncCartItemToServer({ 
          username: this.username, 
          productId: itemToSync.id!, 
          quantity: itemToSync.quantity ?? 0 
        }).subscribe();
      }
    }
  }

  getCart(): Product[] {
    return this.cartItems;
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();

    if (this.username) {
      this.http.delete(`${this.apiUrl}/${productId}?username=${this.username}`).subscribe();
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();

      if (this.username) {
        this.syncCartItemToServer({ 
          username: this.username, 
          productId: item.id!, 
          quantity: item.quantity ?? 0 
        }).subscribe();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();

    if (this.username) {
      this.http.delete(`${this.apiUrl}/clear?username=${this.username}`).subscribe();
    }
  }

  clearCartLocal(): void {
    this.cartItems = [];
    this.updateCart();
    this.username = null;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }
}
