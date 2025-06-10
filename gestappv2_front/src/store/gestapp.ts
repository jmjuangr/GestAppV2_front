// src/store/gestapp.ts
import { defineStore } from "pinia";

const BASE_URL = "http://localhost:8870/api";

// --- DTO Interfaces ---
export interface ProductoDTO {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number;
  categoria: string;
}

export interface ProductoCreateDTO {
  nombreProducto: string;
  precioProducto: number;
  categoria: string;
}

export interface PedidoDTO {
  idPedido: number;
  fecha: string;
  confirmado: boolean;
  productos: ProductoDTO[];
}

export interface FacturaDTO {
  idFactura: number;
  idPedido: number;
  importeTotal: number;
  estaPagada: boolean;
}

export interface UsuarioCreateDTO {
  nombre: string;
  pass: string;
  rol: string;
}

export interface UsuarioLoginResponse {
  token: string;
  usuario: {
    nombre: string;
    admin: boolean;
  };
}

export const useGestAppStore = defineStore("gestapp", {
  state: () => ({
    productos: [] as ProductoDTO[],
    pedidos: [] as PedidoDTO[],
    facturas: [] as FacturaDTO[],
    token: "",
    usuario: null as UsuarioLoginResponse["usuario"] | null,
  }),

  actions: {
    // --- Productos ---
    async fetchProductos() {
      const res = await fetch(`${BASE_URL}/producto`);
      this.productos = await res.json();
    },

    async addProducto(dto: ProductoCreateDTO) {
      const res = await fetch(`${BASE_URL}/producto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(dto),
      });

      const nuevo = await res.json();
      this.productos.push(nuevo);
    },

    // --- Pedidos ---
    async addPedido(productosIds: number[]) {
      const res = await fetch(`${BASE_URL}/pedido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ productosIds }),
      });

      const nuevo = await res.json();
      this.pedidos.push(nuevo);
    },

    async fetchPedidos() {
      const res = await fetch(`${BASE_URL}/pedido`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.pedidos = await res.json();
    },

    // --- Facturas ---
    async addFactura(idPedido: number) {
      const res = await fetch(`${BASE_URL}/factura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ idPedido }),
      });

      const nueva = await res.json();
      this.facturas.push(nueva);
    },

    async fetchFacturas() {
      const res = await fetch(`${BASE_URL}/factura`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.facturas = await res.json();
    },

    // --- Login ---
    async login(nombre: string, pass: string) {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, pass }),
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data: UsuarioLoginResponse = await res.json();
      this.token = data.token;
      this.usuario = data.usuario;
    },

    logout() {
      this.token = "";
      this.usuario = null;
    },

    async registerUsuario(dto: UsuarioCreateDTO) {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        throw new Error("Error al registrar el usuario");
      }
    },
  },
});
