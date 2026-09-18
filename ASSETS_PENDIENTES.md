# Assets pendientes — Copo Loyalty Landing

Lista de pedido para producir las 9 imágenes que la landing deja reservadas como huecos (`.ph`). Ninguna existe todavía — los `<img>` apuntan a rutas que no existen a propósito, así que cada hueco se ve como un placeholder discreto (ID · proporción · descripción) hasta que se coloque el archivo real en esa ruta exacta. El layout no se mueve cuando lleguen: cada hueco ya reserva su alto final con `aspect-ratio`.

Ordenadas por prioridad: primero lo que se ve en el hero y los primeros dos scrolls, luego el resto.

---

## IMG-01 — Pass abierto en el Wallet (hero)
- Sección: Hero
- Ruta: `assets/wallet/hero-pass-ios.png`
- Tipo: **foto real**
- Proporción y tamaño: 7:5 horizontal · 1400×1000 px mínimo · JPG o PNG
- Debe verse: el pass de loyalty abierto en el Wallet de un iPhone, sostenido en mano, con el mostrador de un negocio real desenfocado de fondo. Que se lea el diseño de la tarjeta (color, nombre, sellos) sin que la mano ni el fondo compitan con ella.
- Evitar: fondos genéricos de stock, manos que tapen el QR o el contador de sellos, teléfonos con notificaciones ajenas visibles en pantalla.
- Prioridad: **crítica** — es lo primero que se ve al abrir la landing.
- Con qué se toma: celular, luz natural (evitar flash directo sobre la pantalla, que genera reflejo). Encuadre: pantalla del teléfono llenando la mayor parte del cuadro, mostrador visible pero fuera de foco detrás.
- Alternativa si no se consigue: recorte del pass solo (sin mano ni mostrador), a mayor escala.

## IMG-04 — Diseño de la tarjeta
- Sección: Cómo funciona, paso 1
- Ruta: `assets/screenshots/dashboard-diseno.png`
- Tipo: **captura de UI** (dashboard de Loyalty, navegador, modo claro)
- Proporción y tamaño: 14:9 · 1400×900 px mínimo · PNG
- Debe verse: el editor de tarjeta con un negocio de ejemplo cargado, color de marca aplicado, meta de sellos y premio ya escritos. Que se lea el resultado, no un formulario vacío.
- Evitar: datos reales de clientes, correos, teléfonos, nombres de negocios que no sean de ejemplo.
- Prioridad: alta (es el paso 1, se ve en el primer scroll después del hero).
- Cómo se saca: abrir el editor con un negocio de prueba, llenar los campos, capturar pantalla completa del navegador en modo claro.
- Alternativa si no se consigue: recorte solo del panel de previsualización de la tarjeta.

## IMG-05 — Registro del cliente
- Sección: Cómo funciona, paso 2
- Ruta: `assets/screenshots/registro-cliente.png`
- Tipo: **captura de UI** (página `loyalty-join` en celular)
- Proporción y tamaño: 4:7 vertical · 800×1400 px mínimo · PNG
- Debe verse: la pantalla de registro tal como la ve el cliente en su celular — nombre, teléfono, correo, PIN — con datos de ejemplo ya escritos, no vacía.
- Evitar: teléfonos o correos reales de clientes; usar datos ficticios tipo "Ejemplo Pérez".
- Prioridad: alta (paso 2, mismo scroll que IMG-04).
- Cómo se saca: abrir la página de registro en un celular real o en modo responsive del navegador, capturar con los campos ya llenos.
- Alternativa si no se consigue: recorte del formulario sin el marco del navegador/teléfono.

## IMG-06 — Lista de clientes
- Sección: Cómo funciona, paso 3
- Ruta: `assets/screenshots/dashboard-clientes.png`
- Tipo: **captura de UI** (dashboard, lista de clientes / analytics)
- Proporción y tamaño: 14:9 · 1400×900 px mínimo · PNG
- Debe verse: la tabla o vista de clientes con columnas de visitas y frecuencia, con datos de ejemplo que dejen claro el patrón "quién vuelve y cada cuánto".
- Evitar: nombres, teléfonos o correos de clientes reales — usar una base de datos de prueba.
- Prioridad: alta (paso 3, cierra el primer scroll de la landing).
- Cómo se saca: captura de pantalla completa del navegador con la tabla de clientes de un negocio de prueba, modo claro.
- Alternativa si no se consigue: recorte solo de la tabla, sin el resto del dashboard.

## IMG-02 — Pass en Apple Wallet
- Sección: La tarjeta por dentro (Wallet)
- Ruta: `assets/wallet/pass-ios.png`
- Tipo: **captura de pantalla** (iPhone, app Wallet)
- Proporción y tamaño: 4:7 vertical · 800×1400 px mínimo · PNG
- Debe verse: el pass de Copo Loyalty dentro de la app Wallet, captura limpia del sistema (sin editar la barra de estado), con al menos otra tarjeta o pase asomando detrás para que se note que convive con el resto del Wallet.
- Evitar: recortar la barra de estado o el reloj de forma que se note editado.
- Prioridad: media-alta (segundo scroll).
- Cómo se saca: captura de pantalla nativa de iPhone (botón lateral + volumen) con la app Wallet abierta en el pass de Copo.
- Alternativa si no se consigue: usar solo IMG-03 (Google Wallet) a mayor escala y explicar en el copy que también existe en iOS.

## IMG-03 — Pass en Google Wallet
- Sección: La tarjeta por dentro (Wallet)
- Ruta: `assets/wallet/pass-android.png`
- Tipo: **captura de pantalla** (Android, app Google Wallet)
- Proporción y tamaño: 4:7 vertical · 800×1400 px mínimo · PNG
- Debe verse: el mismo pass de Copo Loyalty, ahora dentro de Google Wallet en un Android real.
- Evitar: capturas de emulador con marcos de desarrollador visibles.
- Prioridad: media-alta (junto con IMG-02, mismo bloque).
- Cómo se saca: captura de pantalla nativa de Android con Google Wallet abierto en el pass de Copo.
- Alternativa si no se consigue: usar solo IMG-02 (Apple Wallet) a mayor escala.

## IMG-07 — Panel de movimientos / anomalías
- Sección: Lo que sí controla el dueño
- Ruta: `assets/screenshots/panel-anomalias.png`
- Tipo: **captura de UI** (dashboard, panel de movimientos)
- Proporción y tamaño: 14:9 · 1400×900 px mínimo · PNG
- Debe verse: la vista de movimientos con el registro por cajero, dispositivo y método de verificación — lo que respalda el copy de "queda registrado quién lo puso".
- Evitar: nombres reales de cajeros o clientes; usar datos de prueba.
- Prioridad: media.
- Cómo se saca: captura de pantalla completa del navegador con movimientos de ejemplo cargados, modo claro.
- Alternativa si no se consigue: recorte de una sola fila de movimiento ampliada, mostrando los campos clave (cajero, hora, verificación).

## IMG-09 — Celular escaneando el QR
- Sección: Cómo se escanea
- Ruta: `assets/screenshots/mostrador-camara.png`
- Tipo: **foto real**
- Proporción y tamaño: 4:7 vertical · 800×1400 px mínimo · JPG
- Debe verse: un celular apuntando su cámara al QR del pass de un cliente (otro celular o impreso de prueba), con la página de mostrador visible en pantalla mientras escanea.
- Evitar: datos reales de un cliente en el pass que se está escaneando; usar un pass de ejemplo.
- Prioridad: media.
- Con qué se toma: dos celulares (uno hace de "cliente" mostrando el pass, otro escanea), luz de mostrador normal, sin flash. Encuadre cercano a las dos pantallas para que se lea la acción de escaneo.
- Alternativa si no se consigue: la sección se defiende con el texto solo — las tres franjas ya explican cada método sin necesitar imagen. Si el tiempo apremia, esta es la primera que se puede soltar.

## IMG-08 — Loyalty dentro del cobro del POS
- Sección: Si ya usas el POS Copo
- Ruta: `assets/screenshots/pos-checkout-loyalty.png`
- Tipo: **captura de UI** (POS de Copo, paso de cobro)
- Proporción y tamaño: 14:9 · 1400×900 px mínimo · PNG
- Debe verse: el paso del flujo de cobro del POS donde el sello se aplica automáticamente, para respaldar "el sello se pone solo".
- Evitar: productos o montos de ventas reales; usar un ticket de prueba.
- Prioridad: media-baja (sección de refuerzo, no es la primera explicación del producto).
- Cómo se saca: captura de pantalla del POS (tablet o navegador) en el momento exacto en que se confirma el sello dentro del cobro.
- Alternativa si no se consigue: esta sección también se sostiene solo con texto — es la más prescindible de las capturas de UI si hay que priorizar.

---

## Resumen

- **Fotos reales que hay que tomar:** 2 (IMG-01, IMG-09) — requieren celular, negocio real y mostrador.
- **Capturas que se sacan del producto:** 7 (IMG-02, IMG-03, IMG-04, IMG-05, IMG-06, IMG-07, IMG-08) — se resuelven en minutos con datos de ejemplo, nunca con datos reales de clientes.
- **La única imagen que no puede faltar para publicar:** **IMG-01**. Es el hero, lo primero que ve cualquier visitante, y ninguna otra sección depende de que exista — pero el hero sin ella pierde el gancho visual del producto. El resto de los huecos (incluyendo IMG-08 e IMG-09) puede quedar vacío al lanzar sin que la landing se vea rota, porque cada sección ya está construida para sostenerse con tipografía.
