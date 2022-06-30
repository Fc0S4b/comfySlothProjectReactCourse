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

### SingleProduct - ProductImages

1. inicialmente images que pasa al componente ProductImages como props, está indefinido, aún no se ha cargado, por lo que por default el prop estará definido como un array con url='' ya que se usará url pero también estará inicialmente indefinido (el prop queda como { images = [{ url: '' }] } )
2. la galería usa el hook useState en donde main va a usar images[0] por default y setMain cambiará la imagen principal cuando se haga click sobre una imagen en miniatura ( onClick={() => setMain(images[index])})
3. dos elementos en el render, un img con la imagen principal src={main.url} y un div gallery con images.map para setear según index la imagen principal onClick
4. una clase dinámica para establecer un border cuando se selecciona la miniatura, como es condicional se establece la clase con op ternario.

#### Single Product - Stars (manual approach)

1. Pasar props stars y reviews desde el componente SingleProductPage al componente Stars
2. la forma manual de hacerlo sería hacer 5 span, una para cada estrella, y con op ternarios anidados ir probando condiciones y estableciendo los íconos de estrellas correspondientes
3. por ejemplo para la primera estrella: si stars es mayor que uno, entonces muestra un ícono de estrella relleno, si no lo es y es mayor que 0.5, entonces muestra un ícono a la mitad y sino solo muestra el ícono sin relleno.
4. para el resto de los span, van creciendo las condiciones en 1 ya que debe considerar la estrella anterior

#### Single Product - Stars (array approach)

1. para configurar de forma programática el componente stars, se debe crear un array de length 5 con Array.from
2. el callback que usa Array.from debe retornar el span configurado de forma manual solo que tendrá como parámetro index que sumará 1 en caso de que sea estrella llena, o incrementará a la mitad si es media estrella (index + 1, como parte de 0 index y number= index+0.5 para los incrementos medios)
3. el array se guarda en una variable tempStars y se redenriza en un div

#### singleProduct - Add to cart -colors

1. product contiene los datos de colores que necesitamos para hacer los botones, por lo que pasamos product como props a AddToCart desde SingleProductPage
2. destructuramos product para obtener aparte de colors, stock e id que mas tarde utilizaremos
3. El wrapper renderizado contendrá un map al colors que retornará la cantidad de botones según colores disponibles, tendrá style que cambiará según el color correspondiente al item. También tendrá una clase dinámica que decide si es un botón activo o no dependiendo si es el color seleccionado
4. el color seleccionado se define con el hook useState, siendo default colors[0]
5. el botón reacciona con onClick para cambiar el estado de color principal a color elegido y que a la vez cambie su clase
6. Una vez seleccionado el botón o el color, se muestra un ícono de FaCheck por encima

#### Amount Buttons

1. Desde el componente AddToCart se crea un div con el componente de AmountButtons con los props de amount, increase y decrease. Estos props son configurados en el mismo componente de AddToCart. Aparte se usa un Link hacia el carro de compras
2. AmountButtons tendrá configurado dos botones con onClick que reaccionarán a decrease e increase y entremedio un h2 con el amount.
3. Para setear increase y decrease, se define amount como estado y setAmount que lo cambiará, default=1.
4. increase lo que hace es invocar a setAmount para que sume el valor antiguo + 1 y lo retorne, con la condición de que si es mayor que el stock disponible, retorne el stock
5. al igual que increase, decrease restará - 1 al antiguo valor y devolverá 1 si el valor temporal del amount es menor que 1
6. el valor antiguo que toma setAmount en una callback, es lo que se llama "reaccionar al estado antiguo". No se puede usar state dentro de un setState, pero si puede tomar una callback que tenga de parámetro una variable que actúa como estado previo y se define la callback en función de ese estado previo para retornar el valor actualizado

#### filter context setup

1. FilterProvider envuelve el componente App en index y a su vez es envuelto por ProductsProvider
2. el FilterProvider como nuevo context para mantener más ordenado los contextos (se puede hacer todo en uno solo) usará products obtenido desde useProductsContext.
3. FilterProvider usará useReducer para manejar el reducer de filter, con estado inicial de all_products y filtered_products igual a un arreglo vacío
4. cuando se renderize el contexto (usando useEffect), enviará la acción de LOAD_PRODUCTS al reducer del filter y un payload de products, products estará en la lista de dependencias
5. el reducer al reaccionar con LOAD_PRODUCTS tomará los estados previos iniciales y actualizará all_products y filtered_products a lo que lleva el payload

#### Products Page - Grid View

1. pasar los valores del estado inicial al FilterContext.Provider para recuperarlos desde los componentes
2. Setear el componente ProductsPage con el título de PageHero/ y un Wrapper que contiene componentes de Filters/ Sor/ y ProductList/
3. ProductList contiene la lista de products, products se recupera desde filtered_products con useFilterContext. Posser un Wrapper de componente llamado GridView con props de product
4. GridView es una grilla que muestra la lista de productos de dos formas distintas, una resumida y otra detallada por item. Para el primer caso se encierra en un div un products.map para desplegar por cada item un componente Product que recibe una key por ser lista iterable y el resto de las props {...product}

#### List view

1. vamos alternar grid_view entre falso y verdadero para mostrar la grilla y no, para eso se define como estado inicial grid_view:false en el filter_context
2. ProductList tendrá como condición de que si grid_view es falso, entonces se muestra el componente ListView con el prop de products. También tiene una condición de que no muestra productos si products.length es menor a 1
3. El componente ListView itera sobre el prop products con map para mostrar un article de key id, image, name y price con formatPrice. Un description acortado con el método substring y un link al producto ruteado al enlace según id

#### Sort Component - Basic Setup

1. El componente sort usará products y grid_view de useFilterContext
2. la idea es crear dos botones con íconos de grilla rellena y de lista para activarse con clase condicional según grid_view sea verdadera o falsa
3. un p con products.length para indicar cuantos productos se encontraron
4. un form con 4 opciones de selección según tipo de sort (ya sea precio alto, bajo, por orden alfabético a-z o z-a)

#### Sort component - view buttons

1. para togglear grid_view entre verdadero y falso (mostrar grilla o lista), realizamos dispatch a las acciones de SET_GRIDVIEW y SET_LISTVIEW al FilterProvider ya que estas acciones se pasarán a través de value como props al componente sort
2. En el reducer del filter, cambiará de estado grid_view a true o false según el valor que tenga action.type: SET_GRIDVIEW o SET_LISTVIEW
3. recuperamos las funciones setGridView y setListView desde useFilterContext en el componente Sort y lo seteamos en onClick para cada botón correspondiente

#### Sort Component - Controlled input

1. se define en el context del filter como estado inicial sort: 'price-lowest' y una función en el provider de updateSort que mandará UDPATE_SORT al reducer con dispatch, también mandará como payload value que será la opción de filtro seleccionada (bajo precio, alto, orden alfabético a-z o z-a). updateSort se pasa como props en el provider, sort ya va incluido en el ...state
2. desde el componente Sort, como en las opciones de sort, cada una tiene un value asignado así como también el select con el name sort que se usará posteriormente (for demostration), select tendrá onChange usar updateSort y value= sort por default, entonce cuando se cambia la selección, value se actualiza y se pasa al contexto que será manejado por el reducer
3. el reducer reaccionará a UPDATE_SORT actualizando sort de estado inicial igual al action.payload enviado con el dispatch anteriormente

#### Sort Functionality

1. filterContext usará un useEffect para mostrar en el momento del render, el orden de los productos de acuerdo a la clasificación (sort), para esto enviará dispatch con SORT_PRODUCTS y con lista de dependencia products y state.sort, ya que sort en el estado inicial cambia por cada render
2. el reducer manejará SORT_PRODUCTS por lo que necesitará manejar 4 condicionales de acuerdo a cada valor del sort.
3. Una lista con filtered_products será la encargada de retornarse pero dependiendo del valor del sort, tendrá valores ordenados que le indique el mismo sort
4. para ordenar valores de precio, usa sort comparando a.price- b.price para precios de menor a mayor y b.price - a.price para mayor a menor (la diferencia entrega un valor menor a cero, 0 o mayor a cero que le indica a sort donde situar a con respecto a b y viceverza, si es negativo entonces a va antes que b, 0 no se mueve y mayor a cero entonces b antes que a)
5. para comparar letras se puede usar localeCompare que devuelve un número al igual que sort, menor a 0 si la letra a va antes que b o mayor a cero si b va antes que a y cero si estan en el mismo nivel. Este número devuelto se pasa a sort y ordena a la lista de los productos filtrados.
6. el retorno es asignando filtered_products: tempProducts para que se asigne a una lista vacía si es que tempProducts no tiene ningún valor.
