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

#### filters - default values

1. definimos los filtros como estado inicial texto, company, category, color, min y max price, price y shipping. Min price y max price tendrá valor default 0. Usaremos el mismo render incial (LOAD_PRODUCTS) para desplegar los filtros iniciales
2. en el reducer, precisamente en el condicional que maneja LOAD_PRODUCTS, se define una lista de todos los precios que hay en products (recuerda que products se pasa como payload), luego esa lista se obtiene con Math el máximo precio.
3. el retorno de ese condicional en el reducer tendrá definido el nuevo estado de los filters max price y price al mismo valor de maxPrice.

#### filters -text

1. en el context de filter, se debe establecer en el useEffect de SORT_PRODUCT un dispatch antes con FILTER_PRODUCT, se agrega a la lista de dependencias state.filters para que no se renderize por cada cambio de filtro.
2. también se establece en el contexto updateFilters que recoge el name y value del target de la casilla search (que se recoge desde el componente filters), esta función actualizará el filtro con UPDATE_FILTERS y payload name y value (se define clearFIlters para setearla posteriormente). No olvidar pasar como props estas dos funciones al provider
3. en el componente de Filters, se recoge del contexto todos los filtros incluyendo las funciones de actualizar filtros, limpiar filtros y todos los productos.
4. Filters tendrá un form que desactivará la opción por default al onSubmit y tendrá un input tipo texto con name= 'text' y value={text} con onChange={updateFilters}. onChange cambiará el valor de text y lo establecerá en el value. name ahora es válido porque filters tiene múltiples valores y solo interesa el que calza con name='text' (a diferencia de updateSort)
5. el reducer reaccionará a UPDATE_FILTERS, recuperando name y value del payload y cambiando el estado inicial de filters a {...state.filters, [name]:value}
6. también reducer reaccionará a FILTER_PRODUCTS cuando se escriba algo en la casilla de input text (este es el que se envía antes de SORT_PRODUCT en el useEffect del filter context)

#### filters - unique values

1. definir únicas categorías en el componente filters para category, company y colors, pasándole como parámetro a la función getUniqueValues (definida en helpers) el array de all_products y el type (category, company o colors)
2. en el helpers se define getUniqueValues que toma el array (all_products) y type (tipo de categoría), se define los valores que calzen con algún tipo de categoría usando map para recorrer el arreglo y recogiendo la categoría que calza con el tipo item[type]
3. si el type es colors entonces se reduce a un array de un nivel de profundidad usando el método flat (colors tiene varios niveles en su arreglo por lo que se puede aplanar con flat(), si flat tiene valor 2 entonces reduce a dos niveles de profundidad y así sucesivamente).
4. por último getUniqueValues retorna la categoría 'all' con las únicas categorías que se establecen con new Set()

#### filters - categories

1. armar en el componente Filters un div con las categorías que se obtienen iterando sobre categories (obtenido antes con getUniqueValues), por cada categoría mostrarla como botón y asignarle una clase condicional que establece el botón activo además de la reacción a onClick para updateFilters
2. updateFilters no podrá actualizar los valores de name y value a la categoría actual porque value en el button de categories no recupera el texto que contiene ese botón. Para no tener que escribir una nueva función que actualize esto en el context y manejarla con el reductor, se coloca un condicional en updateFilters en donde si name === 'category' entonces value = e.target.textContent

#### filters - companies

1. armar lista desplegable de companies en el componente Filters. Con un select que tiene por value company, onChange updateFilters y que despliega option con map para cada companies asignándole value a la compañía respectiva

#### filters - colors

1. armar colors en el componente de filters desplegando un botón por cada color de la lista de colors. Cada botón tendrá una clase dinámica que reaccionará de acuerdo a si está activo o no y un data-set igual al color iterado. Ya que al tener un button no podemos acceder al contenido de este con value pero si con data-set. Cada botón reaccionará con updateFilters y habrá un ícono de Check dinámico si el color coincide con el item iterado
2. habrá un return distinto para el botón de all, con clase distinta en all y data-color all, esto es porque all no tiene color en particular y su contenido es all.
3. en el context para updateFilter, al igual que en category, se debe establecer un condicional en caso de que name sea igual a color para establecer el value = e.target.dataset.color

#### filters - price

1. ocupamos range para filters de price, este debe ser con formatPrice y un range que cambia el price según updateFilters (usando además min_price y max_price como atributos del range)
2. value toma price como texto, por lo que en el context updateFilters se debe asignar un condicional tal que si name es price entonces value debe ser Number(value)

#### filters - shipping and clear filters

1. para shipping en Filters será un label con free shipping y un input tipo checkbox que tendrá al onChange={updateFilters} y checked como booleano de shipping.
2. updateFilter tendrá como condición de que si name === shipping entonces value = e.target.checked
3. fuera del form en Filters habrá un button clear btn con onClick clearFilter, una nueva función en el context y por ende en el reducer
4. en el context, clearFilters mandará como dispatch CLEAR_FILTERS
5. Reducer reaccionará a CLEAR_FILTERS para setear todo como el estado inicial (copy y paste initialState) a execpción de max_price y min_price que no cambiarán a un estado incial de 0 y price tampoco tendrá estado incial de 0 por lo que se le asigna el valor de max_price

#### filter functionality -setup and text input

1. se necesita tener all_products que va a tener el valor de todos los products y filtered_products que siempre estará cambiando porque si solo se tiene filtered_product en cosa de segundos se quedará sin elementos, siempre se necesita tener una copia de todos los productos (acceso a los valores default).
2. lo anterior se obtiene agregando en el reducer para FILTER_PRODUCTS, tempProducts = ...all_products como array para que tome todos los valores default u retorne en filtered_products: tempProducts
3. si text recuperado de state.filters existe, entonces se actualiza tempProducts igual al nuevo tempProducts (que toma ...all_products) filtrado que retorna solo los items que contienen las letras que coinciden las primeras letras con los nombres de los productos

#### filter functionality - rest of the filters

1. si category en el condicional de FILTER_PRODUCTS no es igual a all entonces también, tempProducts será igual al nuevo tempProducts (igual al ...all_products) pero filtrando los product.category === category (esto igual con company)
2. para colores es diferente porque es un array por lo que se debe agregar una callback en filter. Este sería find que busca en product.colors el item que coincida con el color de la categoría actual
3. para shipping se filtra tempProduct tal que product.shipping sea true
4. para price se filtra tempProducts según el product.price sea menor al price del estado actual

#### cart context setup

1. estado inicial en el context de cart una lista vacía llamada cart, total_items:0, total_amount:0, costo de envío $5.34 (en centavos 534). Pasarlos al provider en el value el state invocado por useReducer que recibe el reducer y el initialState
2. envolver App en el index con el CartProvider

#### AddToCart Setup

1. el provider del cart pasará una función a los componentes hijos addToCart. Esta función recibe id, color, amount y product como argumentos para dárselos al payload junto con la acción de ADD_TO_CART para que lo maneje el reducer
2. El componente AddToCart pasará los argumentos anteriores cuando se haga click en el enlace de add to cart, así le dará el id, producto y los estados actualizados de mainColor con amount

#### AddToCart Reducer - New item

1. recuperar id, color amount, product del payload para manejar la acción de ADD_TO_CART
2. definir item temporal que buscará en el estado de cart si el id del item coincide con el id + color del item porque si no es así entonces estamos agregando un elemento completamente nuevo
3. como no existe al principio un elemento con id = id+color entonces se crea un nuevo item que tenga ese id, más name: product.name, color, amount, image: product.images[0].url ya que images es un arreglo, price:product.price y max: product.stock. Una vez que se crea este nuevo item se retorna junto con el ...state mas un cart que tenga ...state.cart y el item nuevo
4. una vez que existe este elemento, el elemento temporal será verdadero ya que find encontrará ese match entonces se debe manejar el estado true de tempItem con el if

#### AddToCart Reducer - Existing Item

1. si tempItem ya existe entonces se va a crear otro item temporal llamado tempCart. Este item se recorrerá con un map para devolver un nuevo arreglo. Este nuevo arreglo tiene dos condiciones, si el producto ya está en el carro entonces se incrementa la cantidad de ese producto (en amount), además si supera el stock, entonces se establece hasta un máximo igual al stock, entonces por esta parte se retorna los items anteriores de la lista ...cartItem mas el amount modificado amount:newAmount. En cambio si no coincide el elemento en particular con alguno que ya esté adentro, simplemente se retorna ese item para que se agregue a tempCart. Finalmente se retorna ...state con cart modificado a cart:tempCart

#### cart page setup

1. en el context se definen las funciones removeItem, toggleAmount y clearCart, las cuales se pasan a través del provider
2. CartPage tendrá la lista de items que se recupera desde cart con useCartContext
3. si la lista cart no tiene elementos entonces se despliega un mensaje diciendo que está vacío y un link de vuelta hacia los productos
4. si tiene elementos cart entonces se configura la página de acuerdo un título dado por el componente de PageHero y un Wrapper envolviendo otro componente CartContent

#### localstorage

1. setup funcionalidad donde cada vez que haya un cambio en el carro se invoca useEffect y se guarda el current cart en el localstorage
2. esto significa que state.cart estará en la lista de dependencias en un useEffect dentro del context. Se guardará en el localStorage.setItem 'cart' y se convertíra a formato JSON state.cart
3. Existirá una función que recuperará cart desde localStorage y devolverá el cart convertido a formato normal (con JSON.parse) de lo contrario si no hay elementos en cart entonces devuelve una lista vacía
4. initialState tendrá entonces a cart con valor a la función de getLocalStorage()

#### cart content

1. el componente CartContent tendrá cart y clearCart recuperado de useCartContext
2. Habrá un componente para desplegar la grilla de los items llamado CartColumns, uno para cada item llamado CartItem y una opción que resume la compra con CartTotals
3. se itera sobre cada cart con map para desplegar un CartItem con su propio key y el resto de las props ...item
4. hay un link hacia la página de productos y un botón con la opción de limpiar el carro de compra que reacciona al onClick={clearCart}

#### cart columns

1. componente con 4 columnas y un span vacío, con un encabezado de item, price, quantity y subtotal

#### cart totals

1. se recupera total_amount y shipping_fee desde useCartContext
2. CartTotals tendrá un subtotal con formatPrice(total_amount), un shipping fee: con formatPrice(shipping_fee) y un total con la suma de los dos
3. un link hacia la página de pago

#### cart item

1. con las props que se le pasasn a cartITem se recupera id, image, name, color, price y amount
2. también removeItem y toggleAmount desde useCartContext
3. se definen nuevas funciones de increase y decrease
4. en el render tendrá un div con la imagen del producto, su nombre y color seleccionado además de su precio si es que se despliega en pantalla chica
5. fuera de ese div (que corresponde a una columna del grid) se muestra el precio que será visto en pantalla completa
6. otra columna con el componente de AmountButtons con props de amount, increase y decrease ya que se ajustará desde la misma página la cantidad de productos
7. una columna de subtotal con price\*amount
8. un botón de basura para remover items

#### cart - remove item and clear cart

1. desde el cart context se establece las funciones que darán las instrucciones para que el reducer reaccione, este es removeItem que le entregará al payload el id del producto con REMOVE_CART_ITEM y clearCart que envía la acción de CLEAR_CART
2. el reducer tendrá como función para REMOVE_CART_ITEM un filtro de los productos actuales de cart si no son iguales al id que se entrega por payload, entonces si es así, se devuelve el nuevo estado {...state, cart: tempCart}. tempCart contiene los productos que no coincidían con el id filtrado
3. reducer reaccionará a CLEAR_CART para solo dejar el nuevo estado del carro vacío {...state, cart:[]}

#### cart - toggle amount

1. con toggle amount como función definidida en cart context, tendrá como parámetro id y value que se pasarán como payload al reducer con la acción de TOGGLE_CART_ITEM_AMOUNT
2. El componente de CartItem tendrá como función increase que tomará la función del context toggleAmount para pasarle el id y el value= 'inc' y para decrease será lo mismo pero con value='dec'
3. el reducer se encargará del id y value del payload al reaccionar a TOGGLE_CART_ITEM_AMOUNT para establecer un arreglo temporal tal que dependa del value
4. primero se verifica si el item seleccionado coincide con el id, de lo contrario lo deja igual. Si es el mismo id, entonces se pregunta si se desea inc o dec, si se incrementa entonces se establece un newAmount tal que amuenta por 1 por cada reacción y se asigna a amount para retornarlo. Si supera el stock entonces entrega el máximo de stock
5. de la misma forma se define el dec, con la diferencia que decrece por 1 unidad y si es menor que 1 newAmount será 1

#### cart -calculate totals

1. establecer en cartButtons el total_items recuperado desde cart context para establercer dinámicamente el cambio en la cantidad de items en el carro que se ve en el ícono del mismo
2. useEffect del localStorage enviará al reducer COUNT_CART_TOTALS para renderizar cada vez que cambia el total
3. el reduce lo que hará será iterar sobre el array de state.cart con reduce y contar por cada item cual es el precio y la cantidad de items en el carro
4. de la función reducer se desctructura total_items y total_amount para retornar como respuesta del reducer con {...state, total_items, total_amount}
5. lo que hace reduce es retornar un objeto con total_items y total_amount que comienzan con valores default de 0
6. reduce toma amount y price de cartItem (que entra como parámetro). amount se lo añade al total_items y price\*amount al total_amount, se retorna siempre el total

#### login con auth0 setup

1. se usará auth0 para el login para eso se necesita configurar el Auth0Provider que envuelve los componentes en el index y el useProvider que será configurado desde user_context.
2. Auth0Provider debe tener clave de domain, clientID y cacheLocation para que se conecte a la cuenta configurada desde la página web de auth0. Las claves son guardadas en archivo env (para configurar un archiv env debes definir una variable que almacene la clave pero que parta con el nombre de REACT*APP* y luego acceder a ella desde index con process.env.REACT*APP*, gitignore no tomará en cuenta los archivos env pero si el build final)
3. el context de user tendrá isAuthenticated, loginWithRedirect, logout, user, isLoading que se recupera de useAuth0. Tendrá también una función de estado con useState con default null para el usuario y un useEffect que dependerá de isAuthenticated

#### Auth0 - Login / logout buttons

1. se configura el componente de CartButtons para recuperar logintWithRedirect, myUser y logout desde useUserContext
2. para el botón que tiene login, debe reaccionar onClick a loginWithRedirect y se debe hacer un botón para logout que reaccione con onClick a () => logout({returnTo: window.location.origin}), tendrá ícono de FaUserMinus

#### auth0 toggle values

1. useEffect en user context tiene en su lista de dependencias isAuthenticated, esta variable cambia de true a false cuando se inicia y cierra sesión
2. por lo que useEffect tendrá un hook que establecerá setMyUser(user) si isAuthenticated es true, sino setMyUser(false) (user es obtenido cuando se inicia sesión con auth0, se asigna un objeto a user con la info del usuario)
3. el componente CartButtons usará el valor del estado de myUser (recuperado con useUserContext) en un operador ternario, tal que si es verdadero mostrará el botón de logout y si es falso el botón de login
