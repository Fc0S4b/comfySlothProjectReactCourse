## Notes

#### Older React Version

```
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-scripts": "3.4.3",
```

#### Current React Version

```
"react": "^17.0.1",
"react-dom": "^17.0.1",
"react-scripts": "4.0.0",
```

#### Alternative fix

.env file in the root
FAST_REFRESH=FALSE

### apuntes

#### Error page

1. mostrar una página 404 al setear mal url
2. configurar errorPage con mensaje 404 en un section

#### About, Checkout Page

1. componentes about, checkoutPage y pageHero
2. PageHero se le pasa props de title según title de componente (about o checkoutPage) para que se vea como home / {title}

#### Home Page hero

1. Contiene los componentes de Hero, FeaturedProducts, Services y Contact
2. Desplegar el contenido del hero, texto, botón de compra enlazado a products page y dos imágenes

#### home page - services

1. en services setear los artículos con los p
2. setear un artículo que itere sobre services, importado desde utils

#### home page- contact

1. form con un input de email y un btn de submit para suscribe

#### formspree

1. añadir action desde formspree para el form del proyecto

#### fetchProducts overview

1. fetchProducts() definida en el provider (context) y un useEffect para invocarla usando como url la api que se encuentra en utils

#### fetchProduct complete

1. initialState products_loading, products_error, products y featured_products
2. configurar GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS y GET_PRODUCTS_ERROR con estado inicial en products_loading:true, products_error:false, products: [] y featured_products:[]
3. GET_PRODUCTS_SUCCESS tendrá como payload products recibido del response axios, de esta forma cambiará el estado inicial del arreglo vacío a un arreglo con los productos
4. el reducer le dará a GET_PRODUCTS_BEGIN el loading true, el GET_PRODUCTS_SUCCESS el loading false, products igual al payload y featured_products a una lista filtrada con los products.featured === true
5. GET_PRODUCTS_ERROR en el reducer tendrá el loading false y definirá products_error a true

#### featured products

1. luego de setear el context ahora toca renderizarlo
2. el render consistirá en el featured primero, luego en singleproduct y luego products page.
3. armar el componente Error con un simple div y clases al igual que el componente Loading
4. armar el componente featuredProducts recuperando del contexto loading, error y featured products para renderizar condicionalmente cada caso si está cargando, con error o normal. Si es normal desplegar una lista de 3 productos pasándole cada producto como props al componente producto
5. Product destructurá las props para recoger image, name, price, id y armará el componente con estas variables.
6. se usa Link de react router para dirigir la acción de hacer click en el ícono al producto que tenga el link /product/id

#### format price

1. mostrar los precios divididos por 100 no es recomendable porque javascript presenta bugs cuando opera con decimales, por lo que debes usar una función formatPrice (definida en utils/helpers.js).
2. formatPrice tomará el price como argumento y formateará price según como tenga configurado el método Intl.NumberFormat.
3. el método trabaja con números ya redondeados
4. ojo con la divisa chilena, puede presentar bugs para valores menores a 10000

#### fetch Single product

1. ahora se hace la request para un solo producto configurando una fetchSingleProduct
2. al igual que la fetch anterior, se envía al reducer pero por un solo producto: GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_ERROR, manejado los últimos dos con un trycatch
3. se configura el reucer activando y desactivando loading, error y seteando single_product al action.payload. En SUCCESS error será por default false

#### single product- loading error

1. pasamos la función fetchSingleProduct al provider para que tenerla disponible en los componentes renderizados
2. la usamos en singleProductPage.
3. rescatamos el id usando el hook de router useParams y usamos también useHistory para usar el método que hace que se direccione hacia una página (en este caso hacia /)
4. con useProductsContext rescatamos fetchSingleProduct y la usamos en useEffect con url e id dinámicos y también con id en la lista de dependencias
5. otro useEffect para devolver la página al home en caso de error después de 3 segundos, error en lista de dependencia ya que cambia de estado de false a true

#### Single product- base return

1. configurando el render del singleProductPage, se pasa un PageHero con title={name} para el título de la sección en forma de ruta
2. PageHero recibe como props de singleProductPage product, y con una sentencia booleana se le agrega al render para añadirse al título solo si product existe además del título de la página (esto con link para redireccionar)
3. un btn para regresar a la lista de productos
4. destructurar los elementos que se necesitan desde product (product se obtiene con el context y single_product) y usarlos según el item 5
5. un div con el contenido que tiene el nombre del producto, un componente Stars que muestra íconos de estrellas según clasificación del producto, precio con formatPrice, description, stock dinámico ya que si no hay stock debe mostrar "out of stock", info con el sku (id del producto), company y un componente condicional de AddToCart que se muestra solo si stock es mayor que cero.
