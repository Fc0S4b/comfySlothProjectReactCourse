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
