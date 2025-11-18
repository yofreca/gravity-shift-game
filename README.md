# Gravity Shift

Un juego de puzzle basado en física donde controlas la dirección de la gravedad para guiar una bola hasta la meta.

## 🎮 Controles

- **WASD / Flechas**: Cambiar dirección de la gravedad
  - W/↑: Gravedad hacia arriba
  - S/↓: Gravedad hacia abajo
  - A/←: Gravedad hacia la izquierda
  - D/→: Gravedad hacia la derecha
- **R**: Reiniciar nivel
- **SPACE**: Siguiente nivel (cuando se completa)

## 🚀 Cómo Jugar

1. Abre `index.html` en un navegador web moderno
2. Usa WASD o las flechas para cambiar la gravedad
3. Guía la bola hasta el cuadrado verde (meta)
4. Recolecta estrellas para puntos extra
5. Evita los pinchos y zonas de peligro

## 🎯 Objetivo

Lleva la bola desde el punto de inicio hasta la meta en cada nivel. Opcionalmente, recolecta todas las estrellas para obtener el puntaje perfecto.

## 🛠️ Stack Tecnológico

- **Phaser 3**: Motor de juego HTML5
- **Matter.js**: Motor de física 2D
- **HTML5/CSS3/JavaScript**: Frontend

## 📂 Estructura del Proyecto

```
gravity-shift-game/
├── index.html           # Archivo principal
├── css/
│   └── style.css       # Estilos del juego
├── js/
│   ├── config.js       # Configuración del juego
│   ├── physics.js      # Sistema de física y gravedad
│   ├── player.js       # Clase del jugador (bola)
│   ├── level.js        # Sistema de niveles
│   ├── game.js         # Escena principal
│   └── main.js         # Punto de entrada
└── assets/
    ├── levels/         # Datos de niveles (JSON)
    ├── images/         # Sprites e imágenes
    └── sounds/         # Efectos de sonido y música
```

## 🎨 Características

### Implementadas (Fase 1):
- ✅ Física básica de la bola con Matter.js
- ✅ Control de gravedad en 4 direcciones
- ✅ Plataformas estáticas con diferentes superficies (normal, hielo, pegamento, trampolín)
- ✅ Sistema de spawn y meta
- ✅ HUD básico (nivel, timer, estrellas)
- ✅ Sistema de coleccionables (estrellas)
- ✅ Pinchos y zonas de peligro
- ✅ 3 niveles de prueba

### Próximamente:
- 🔄 Portales de teletransporte
- 🔄 Plataformas móviles
- 🔄 Láseres con patrón temporal
- 🔄 Sistema de guardado con LocalStorage
- 🔄 Efectos de partículas
- 🔄 Sistema de sonido completo
- 🔄 Menú principal y selector de niveles
- 🔄 72+ niveles diseñados

## 🏗️ Desarrollo

El juego está en desarrollo activo siguiendo un plan de 6 fases:

- **Fase 1**: Prototipo básico ✅ (Completada)
- **Fase 2**: Mecánicas core (En progreso)
- **Fase 3**: Contenido expandido
- **Fase 4**: Polish y UI completa
- **Fase 5**: Testing y optimización
- **Fase 6**: Deployment

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

## 🎮 Diseño del Juego

Basado en el documento de diseño completo que incluye 6 mundos con mecánicas progresivas, superficies especiales, y desafíos de puzzle únicos.

---

**Desarrollado con ❤️ usando Phaser 3 y Matter.js**
