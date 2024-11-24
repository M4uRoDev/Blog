---
title: Creando un blog I
date: "2024-11-23"
image: ""
---

Comenzamos el desarrollo de un blog, buscando soluciones donde poder redactar estos tutoriales/bitacoras de los distintos proyectos que voy desarrollando para no perder el training de desarrollador.

Las distintas soluciones que encontré tenían costos asociados y si no estaba sujeto a un sitio externo, gran parte de mis soluciones me generan un beneficio y sin un costo asociado, fuera de la mano de obra que yo mismo pongo para desarrollarlas. Ninguna aplicación que yo haya desarrollado me está incurriendo costos (por ahora), y espero mantenerlo así por un gran tiempo. 

### Serverless

Para partir el blog siempre conocí la tecnología **Serverless**, lo vine escuchando en mi primer trabajo cuando estaba recien surgiendo esta tecnología y aparecian distintos servicios ofreciendo hospedaje serverless. La verdad tengo varios proyectos que no prosperaron pero que ahora podría retomar con la motivación que esto me da. 

Hice las respectivas consultas de riesgo técnico con mi chat gpt de confianza para ver si era factible mi idea, para mi sorpresa me ofreció distintos tipos de soluciones y lo orienté para que me diera una solución donde utilizara tecnologías que yo ya había conocido pero no trabajado. 

### Vercel y Next.js 

Había intentado hacer proyectos con react, react.js, vue, express.js entre otros, si bien lograba hacer avances significativos para mi, la brecha de aprendizaje la encontraba bastante prolongada, pero entendía el concepto. Quizás estaba o estoy mal acostumbrado a un framework rápido con Laravel para PHP, que con un par de comandos `artisan` se genera casi el 80% de código necesario para el funcionamiento y esto ayuda a que esté todo "ordenado" dentro del framework. 

Así que dije, ok vamos y le dije a mi fiel amigo chatgpt: _"hagamos un blog con next.js"_. 

Y aquí comienza...

### Creación del Proyecto

```sh 
npx create-next-app@latest my-blog
```

Hice la creación del repositorio en Github, cree un readme atractivo y bonito, con emogis y esas cosas, un par de comnados más para cargar los archivos base del proyecto más su readme.md y...
```sh
git add .
git commit -m "First commit" # El primero de muchos, espero
git push
```

Ingresé a Vercel, iniciar sesión con mi cuenta github, creación de nuevo proyecto, definimos que utilizaremos Next.js y seleccionamos el repo de nuestro github que utilizaremos. 

Unos minutos y Vercel ya tenia desplegada el index de bienvenida de Next.js.

_"Ahora qué chatgpt?"_ 

### Creación de estructura

![float-right](/images/making-a-blog-i/dir-blog.jpg)

Definimos una estructura base con una carpeta **src** donde almacenaremos todos el proyecto next.js, la carpeta **public** donde cargaremos los recursos públicos que los usuarios puedan consumir, como imagenes o quizás archivos que les quiera compartir. Y lo demás es todo lo relacionado a los terabytes que te instala node. Aquí dejaré una imagen de mi estructura del proyecto, probablemente después deje público el repositorio del blog.

En **components** tenemos el `Layout.tsx`, `ThemeContext.tsx` y `ThemeToggle.tsx`, Layout responde a la estructura base del blog, donde está el header, body y footer. En **content** es donde estoy cargando los post que hago en formato markdown, hay una carpeta **base** que es en la que está la estructura base del archivo .md y en **blog** es donde están los posts. 

En **fonts** estan las fuentes que se utilizan en el blog, en **lib** se encuentra uno de los archivos más importantes del blog, el archivo `posts.ts` este es el encargado de traducir el lenguaje del markdown a una visión html. Aquí es donde estoy implementando (por recomendación de Chatgpt) librerías como:
- gray-matter
- remark
- remark-html
- remark-gfm
- remark-directive
- unist-util-visit

Estas son las librerias necesarias para traducir el contenido del markdown y llevarlo a HTML y visualizarlo tal cual lo estás viendo. 

Luego tenemos **posts** y en su contenido una carpeta llamada **[slug]**, este en Next.js es una ruta dinámica, relacionado al slug de los posts, es decir el nombre de los archivos markdown dentro de la carpeta **blog**.
