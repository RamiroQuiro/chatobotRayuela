const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
// prooverdor de whatsapp
const BaileysProvider = require('@bot-whatsapp/provider/baileys')


// base de datos para el flujo
const JsonFileAdapter = require('@bot-whatsapp/database/json')

// const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

// const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
//     [
//         '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
//         'https://bot-whatsapp.netlify.app/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
//     [
//         '🙌 Aquí encontras un ejemplo rapido',
//         'https://bot-whatsapp.netlify.app/docs/example/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
//     [
//         '🚀 Puedes aportar tu granito de arena a este proyecto',
//         '[*opencollective*] https://opencollective.com/bot-whatsapp',
//         '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
//         '[*patreon*] https://www.patreon.com/leifermendez',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowDiscord = addKeyword(['discord']).addAnswer(
//     ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
//     .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
//     .addAnswer(
//         [
//             'te comparto los siguientes links de interes sobre el proyecto',
//             '👉 *doc* para ver la documentación',
//             '👉 *gracias*  para ver la lista de videos',
//             '👉 *discord* unirte al discord',
//         ],
//         null,
//         null,
//         [flowDocs, flowGracias, flowTuto, flowDiscord]
//     )

// flujo hijos

const flowPlataforma = addKeyword(['plataforma360', 'plataforma']).addAnswer(
    [
        'Rayuela 360',
        'Plataforma de vídeo!!',
        '* Servicio de 2 hs.',
        '* Camara alta calidad',
        '* Videos cortos especial redes sociales.',
        '* Videos ilimitados.',
        '* Sonido y efectos.',
        'IMPORTANTE',
        '*descarga de videos en el momento del evento',
        'SIN INTERNET',
        'Consultar precio para el interior de la provincia.',
        'Comunicate con nosotros consulta por fechas disponibles al',
        '📱 3856982035',
        '📱 3855059240'
    ]
)
const flowCabina=addKeyword(['cabina','cabina fotografica','cabina de fotos',]).addAnswer(
    [
        'Cabina Fotografica',
        'Impresiones de alta calidad',
        'Dos copias: una para el dueño del evento y otra para los invitados',
        'Máxima responsabilidad y confianza',
        'Consultar precio para el interior de la provincia.',
        'Comunicate con nosotros consulta por fechas disponibles al',
        '📱 3856982035',
        '📱 3855059240'
    ]

)
const flowRecepcionQR=addKeyword(['recepcion','recepción','ReceptorQR','recepcionQR']).addAnswer([
        'Recepción QR',
        'Cuando ingresas a la fiesta, se escanea un código QR para indicarte dónde ubicarte.',
        'Comunicate con nosotros consulta por fechas disponibles al',
        '📱 3856982035',
        '📱 3855059240'
    ]
)



// mi flujo principal

const flowPrincipal=addKeyword(['hola','ola','hey','que hay','man', 'buenas','buenos dias'])
.addAnswer(['🌟 Bienvenido a Rayuela 360', '🤔 ¿Qué servicio te gustaría obtener más información?','Espere mientras cargan las imagenes'],null,(ctx,{flowDynamic})=>{
    flowDynamic([{
        body:'*Plataforma360*',
        media:'https://th.bing.com/th/id/OIG.1xsc_xcGeXEZYVyiz2WM?pid=ImgGn'
    },{
        body:'*Cabina Fotografica*',
        media:'https://th.bing.com/th/id/OIG.x1T9jpSriFD8Nv1.ZBWw?pid=ImgGn'
    }
    ,{
        body:'*RecepcionQR*',
        media:'https://th.bing.com/th/id/OIG.CoyN.eiFg23P3APaxvni?pid=ImgGn'
    }])
})
.addAnswer('Escribe que es lo que te estaria interesando',{delay:3000},null,[flowPlataforma,flowCabina,flowRecepcionQR])



const flowSecundario=addKeyword('gracias').addAnswer('de nada')

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
