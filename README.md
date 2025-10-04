# Portfolio Moderno

Un portfolio profesional y moderno construido con Next.js 14, React, TypeScript, Tailwind CSS y Framer Motion.

## 🚀 Características

- **Framework Moderno**: Next.js 14 con App Router
- **Lenguajes**: TypeScript para mayor seguridad de tipos
- **Estilos**: Tailwind CSS para un diseño responsivo y moderno
- **Animaciones**: Framer Motion para transiciones suaves
- **Temas**: Soporte para modo claro/oscuro
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Componentes**: Arquitectura modular y reutilizable
- **SEO**: Optimizado para motores de búsqueda

## 📋 Secciones

- **Hero**: Presentación principal con enlaces sociales
- **Sobre Mí**: Información personal y experiencia
- **Habilidades**: Nivel de competencia y tecnologías
- **Proyectos**: Portafolio de proyectos destacados
- **Contacto**: Formulario de contacto e información

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [React 18](https://reactjs.org/) - Biblioteca de interfaz de usuario
- [TypeScript](https://www.typescriptlang.org/) - JavaScript con tipos
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animaciones
- [Lucide React](https://lucide.dev/) - Iconos
- [next-themes](https://github.com/pacocoursey/next-themes) - Manejo de temas

## 🚀 Instalación y Configuración

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd portfolio
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**
   ```
   http://localhost:3000
   ```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Personalización

### Colores y Temas

Los colores se pueden personalizar en `src/app/globals.css` modificando las variables CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... más variables */
}
```

### Configuración de Tailwind

Modifica `tailwind.config.ts` para personalizar:
- Colores adicionales
- Animaciones personalizadas
- Breakpoints
- Espaciado

### Contenido

Actualiza el contenido en cada componente:
- `src/components/hero.tsx` - Información personal
- `src/components/about.tsx` - Experiencia y biografía
- `src/components/skills.tsx` - Habilidades y tecnologías
- `src/components/projects.tsx` - Proyectos destacados
- `src/components/contact.tsx` - Información de contacto

## 📱 Diseño Responsive

El portfolio está optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🌙 Modo Oscuro

El portfolio incluye soporte completo para modo claro/oscuro con:
- Detección automática del tema del sistema
- Cambio manual mediante botón
- Persistencia de la preferencia del usuario

## 🔧 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── about.tsx
    ├── contact.tsx
    ├── hero.tsx
    ├── navbar.tsx
    ├── projects.tsx
    ├── skills.tsx
    └── theme-provider.tsx
```

## 📈 Performance

- Optimización automática de imágenes con Next.js
- Code splitting automático
- Lazy loading de componentes
- Optimización de fuentes con Google Fonts

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Despliega automáticamente con cada push

### Otros Proveedores

El proyecto es compatible con:
- Netlify
- AWS Amplify
- GitHub Pages
- Railway
- Render

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

Charly Castellanos - [charly@example.com](mailto:charly@example.com)

Enlace del Proyecto: [https://github.com/tu-usuario/portfolio](https://github.com/tu-usuario/portfolio)
