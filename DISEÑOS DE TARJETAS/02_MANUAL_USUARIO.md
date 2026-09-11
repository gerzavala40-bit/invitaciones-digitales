# Manual Completo del Usuario (Prestamista)

## Todo lo que necesitas saber para usar Libro Mayor

---

## 1. Dashboard

Es la primera pantalla al ingresar. Muestra:

| Metrica | Que significa |
|---------|--------------|
| Clientes | Total de clientes en tu base |
| Total prestado | Suma de todos los montos prestados |
| Cobrado | Dinero que ya cobraste (cuotas pagadas) |
| Pendiente | Lo que te deben + cuanto esta en mora |

**Tabla de alertas:** Cuotas que vencen pronto (ambar) o ya vencieron (rojo).

---

## 2. Gestion de Clientes

### Agregar cliente
1. Menu → **Clientes** → **"+ Nuevo cliente"**
2. Datos: Nombre, Apellido, DNI (7-8 digitos), Telefono, Direccion, Red Social
3. Click **"Guardar cliente"**

### Marcar mal pagador
- En la tabla de clientes, click en **"Marcar Mal Pagador"**
- El cliente aparecera con reporte en el Buro para otros prestamistas
- Para revertir: click en **"Quitar reporte"**

### Invitar cliente al portal
- Click en **"Copiar link de invitacion"**
- Enviar por WhatsApp
- El cliente se registra con sus datos + DNI

---

## 3. Gestion de Prestamos

### Crear prestamo
1. Menu → **Prestamos** → **"+ Nuevo prestamo"**
2. Seleccionar cliente, monto ($1 a $99.999.999), cuotas (1 a 365), interes (0% a 999%), frecuencia, fecha inicio
3. El **Simulador** muestra en tiempo real: interes ganado, total a recaudar, ROI, TNA
4. Click **"Crear prestamo"** → cuotas se generan automaticamente

### Ejemplo
$100.000 a 12 cuotas mensuales con 30% interes total:
- Total a recaudar: $130.000
- Cada cuota: $10.833
- ROI: 30%

---

## 4. Seguimiento de Cuotas

- Click en un prestamo para ver el detalle
- **Marcar como pagada:** click en el boton de estado de la cuota
- **Revertir:** click de nuevo en la cuota pagada
- **Ajustar monto:** editar el numero directamente en la columna monto

### Estados:
| Color | Significado |
|-------|-------------|
| Verde | Pagada |
| Gris | Pendiente (no vencio) |
| Ambar | Proxima (vence en 5 dias o menos) |
| Rojo | Vencida (paso la fecha y no se pago) |

---

## 5. Consulta de DNI y Buro de Credito

### Consulta local
1. Menu → **Consultar DNI**
2. Ingresa DNI (7-8 digitos)
3. Si esta en tu base: ves nombre, prestamos, pagos, mora

### Buro Global (requiere Premium)
- Click en **"Consultar Buro Global (Red)"**
- Muestra cuantos prestamistas reportaron a ese DNI
- Muestra cuantos tienen cuotas con mas de 7 dias de atraso
- Muestra datos del registro mas confiable

> Limite: 10 consultas por minuto

---

## 6. Rendimiento de Cartera

Menu → **Rendimiento**. Muestra KPIs financieros:

| KPI | Que es |
|-----|--------|
| Capital Activo | Dinero prestado con cuotas pendientes |
| ROI Promedio | Rendimiento promedio de tu cartera |
| Ganancia Proyectada | Interes que te falta cobrar |
| Ganancia Realizada | Interes que ya cobraste |
| Interes en Riesgo | Interes de cuotas ya vencidas |
| Prestamos en Cartera | Total y cuantos estan activos |

---

## 7. Configuracion de Contacto

Menu → **Configuracion**. Carga tus datos para que aparezcan en el Portal del Cliente:

| Campo | Formato |
|-------|---------|
| WhatsApp | Solo numeros con codigo de pais (ej: 5493411234567) |
| Instagram | URL completa (ej: https://www.instagram.com/tu_perfil/) |
| Catalogo | URL completa (ej: https://tu-tienda.com/catalogo) |

Click **"Guardar cambios"**.

---

## 8. Portal del Cliente

Tu cliente ve:
- Saludo con su nombre y DNI
- Botones de contacto (WhatsApp, Instagram, Catalogo)
- Total pagado y saldo pendiente
- Lista de prestamos con cuotas y estados
- Barra de progreso de pago

**NO puede:** editar montos, marcar cuotas, borrar prestamos, ver otros clientes.

---

## 9. Exportar Datos

- **Clientes:** boton "Exportar CSV" en vista Clientes
- **Prestamos:** boton "Exportar CSV" en vista Prestamos
- Los archivos se descargan como `.csv` (se abren con Excel/Google Sheets)

---

## 10. Recuperar Contrasena

1. En login, click **"Te olvidaste?"**
2. Ingresa tu email
3. Revisa tu casilla (y spam)
4. Click en el link del email
5. Crea nueva contrasena

---

## 11. Tips de Uso

- Usa el Dashboard todos los dias para ver cuotas proximas
- Marca las cuotas como pagadas apenas cobres
- Invita a tus clientes al portal para que dejen de preguntarte "cuanto debo?"
- Antes de prestar a alguien nuevo, consultalo en el Buro
- Exporta CSVs periodicamente como respaldo extra

---

*Libro Mayor v1.0 - Julio 2026*
