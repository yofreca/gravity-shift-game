# Gravity Shift - Documento de Diseño de Juego

## 1. Concepto General

**Título:** Gravity Shift  
**Género:** Puzzle / Plataformas basado en física  
**Plataforma sugerida:** Web (HTML5), PC, Mobile  
**Target:** Jugadores casuales y hardcore que disfrutan puzzles de lógica  

### Descripción
Gravity Shift es un juego de puzzle donde el jugador controla la dirección de la gravedad para guiar una bola desde el punto de inicio hasta la meta. La bola se comporta según leyes físicas realistas: rueda, rebota y cae según la gravedad actual.

---

## 2. Mecánicas Principales

### 2.1 Control de Gravedad
- **Teclas WASD / Flechas:** Cambian la dirección de la gravedad
  - W/↑: Gravedad hacia arriba
  - S/↓: Gravedad hacia abajo
  - A/←: Gravedad hacia la izquierda
  - D/→: Gravedad hacia la derecha
- La transición es instantánea
- Efecto visual de partículas indica la dirección actual
- Sonido distintivo para cada cambio

### 2.2 Física de la Bola
- **Propiedades:**
  - Masa: 1.0 unidad
  - Radio: 0.5 unidades de juego
  - Fricción: 0.3 (superficie normal)
  - Restitución (bounce): 0.2
  - Gravedad: 9.8 unidades/s²

### 2.3 Superficies y Materiales

#### Superficie Normal
- Fricción estándar
- Color: Gris (#7F8C8D)

#### Hielo
- Fricción: 0.05
- La bola desliza más y es difícil de detener
- Color: Azul claro (#AED6F1)
- Efecto visual: Brillo/transparencia

#### Pegamento
- Fricción: 0.9
- La bola se mueve lento pero con control preciso
- Color: Marrón oscuro (#7D6608)
- Efecto visual: Textura viscosa

#### Trampolín
- Restitución: 1.8
- Impulsa la bola en la dirección opuesta a la gravedad
- Color: Verde (#52BE80)
- Animación de compresión al contacto

#### Portal
- Teletransporta a otro portal
- Mantiene la velocidad y dirección
- Color: Púrpura brillante (#9B59B6)
- Efecto de partículas en espiral

### 2.4 Obstáculos y Peligros

#### Pinchos
- Resetean el nivel al contacto
- Colocados en paredes, techos, suelos
- Color: Rojo (#E74C3C)
- Animación sutil de pulsación

#### Zona de Reset
- Áreas que reinician el nivel
- Color: Naranja translúcido (#E67E22)
- Útil para simular lava, vacío, etc.

#### Láser
- Se activa/desactiva en intervalos
- Patrón visual claro antes de activarse
- Color: Rojo brillante con partículas

#### Plataformas Móviles
- Se mueven en patrones predefinidos
- Pueden ser horizontales, verticales o circulares
- Color: Gris oscuro (#566573)

#### Plataformas Temporales
- Aparecen y desaparecen en ciclos
- Indicador visual del tiempo restante
- Color: Azul translúcido cuando activa, contorno cuando inactiva

### 2.5 Coleccionables

#### Estrellas (Opcional)
- 3 por nivel en ubicaciones desafiantes
- Añaden rejugabilidad
- No necesarias para completar el nivel
- Desbloquean niveles bonus

#### Gemas de Tiempo
- Otorgan tiempo extra en niveles cronometrados
- Color: Amarillo brillante (#F1C40F)

---

## 3. Sistema de Niveles

### 3.1 Estructura de Mundos

**Mundo 1: Tutorial (8 niveles)**
- Niveles 1-3: Introducción básica de controles
- Niveles 4-6: Superficies especiales (hielo, pegamento)
- Niveles 7-8: Combinación de mecánicas

**Mundo 2: Momentum (12 niveles)**
- Enfoque en física de velocidad
- Trampolines y rampas
- Timing de gravedad

**Mundo 3: Precisión (15 niveles)**
- Espacios estrechos
- Múltiples peligros
- Requiere planificación

**Mundo 4: Multi-bola (10 niveles)**
- Controlas 2-3 bolas simultáneamente
- Deben llegar a metas separadas
- Mecánica de cooperación

**Mundo 5: Temporal (12 niveles)**
- Límite de tiempo
- Plataformas que aparecen/desaparecen
- Elementos móviles sincronizados

**Mundo 6: Maestría (15 niveles)**
- Combinación de todas las mecánicas
- Niveles más largos y complejos
- Desafío máximo

**Niveles Bonus:** Desbloqueables con estrellas

### 3.2 Mecánicas por Nivel

#### Límite de Rotaciones
- Algunos niveles limitan cuántas veces puedes cambiar la gravedad
- UI muestra contador de cambios restantes
- Añade elemento de estrategia

#### Objetivos Secundarios
- Completar en X segundos
- Usar solo Y rotaciones
- Recolectar todas las estrellas
- No tocar superficie X

---

## 4. Interfaz de Usuario

### 4.1 Pantalla Principal
- Título del juego con animación de bola cayendo
- Botones:
  - Jugar
  - Selector de Nivel
  - Opciones
  - Créditos
  - Salir

### 4.2 HUD en Juego
- **Esquina superior izquierda:**
  - Número de nivel
  - Estrellas recolectadas (X/3)
  - Contador de rotaciones (si aplica)
  
- **Esquina superior derecha:**
  - Tiempo transcurrido
  - Botón de pausa
  
- **Centro inferior:**
  - Indicador direccional de gravedad (visual simple)

### 4.3 Menú de Pausa
- Continuar
- Reintentar nivel
- Opciones
- Salir al menú

### 4.4 Pantalla de Victoria
- Tiempo completado
- Estrellas obtenidas
- Mejor tiempo personal
- Botones:
  - Siguiente nivel
  - Reintentar
  - Menú de niveles

---

## 5. Especificaciones Técnicas

### 5.1 Motor de Física
**Opciones recomendadas:**
- **Web:** Matter.js o Box2D.js
- **Unity:** Physics2D integrado
- **Godot:** Physics2D integrado

**Requisitos:**
- Física determinista para reproducibilidad
- Soporte para raycast (detección de colisiones)
- Cuerpos estáticos, dinámicos y cinemáticos
- Sistema de capas de colisión

### 5.2 Stack Tecnológico (Opción Web)

**Frontend:**
- HTML5 Canvas o WebGL
- JavaScript/TypeScript
- Phaser 3 o PixiJS para rendering
- Matter.js para física

**Estructura de carpetas:**
```
gravity-shift/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── game.js
│   ├── level.js
│   ├── player.js
│   ├── physics.js
│   └── ui.js
├── assets/
│   ├── images/
│   ├── sounds/
│   └── levels/
│       └── level-data.json
└── README.md
```

### 5.3 Sistema de Niveles (JSON)

```json
{
  "levelId": "1-1",
  "world": 1,
  "level": 1,
  "name": "First Steps",
  "rotationLimit": null,
  "timeLimit": null,
  "startPosition": {"x": 50, "y": 50},
  "goalPosition": {"x": 750, "y": 550},
  "stars": [
    {"x": 200, "y": 300},
    {"x": 400, "y": 150},
    {"x": 650, "y": 400}
  ],
  "platforms": [
    {
      "type": "normal",
      "x": 0, "y": 580,
      "width": 800, "height": 20
    },
    {
      "type": "ice",
      "x": 300, "y": 400,
      "width": 200, "height": 20
    }
  ],
  "hazards": [
    {
      "type": "spikes",
      "x": 250, "y": 560,
      "width": 100, "height": 20
    }
  ],
  "movingPlatforms": [
    {
      "x": 400, "y": 300,
      "width": 100, "height": 20,
      "pattern": "horizontal",
      "speed": 2,
      "range": 200
    }
  ]
}
```

### 5.4 Sistema de Guardado

**LocalStorage (Web):**
```javascript
{
  "playerData": {
    "currentWorld": 1,
    "unlockedLevels": 8,
    "totalStars": 15,
    "levelProgress": {
      "1-1": {
        "completed": true,
        "stars": 3,
        "bestTime": 12.5,
        "attempts": 3
      }
    },
    "settings": {
      "musicVolume": 0.7,
      "sfxVolume": 0.8,
      "fullscreen": false
    }
  }
}
```

---

## 6. Arte y Assets

### 6.1 Estilo Visual
- **Estética:** Minimalista, limpia, colorida
- **Paleta de colores:** Colores brillantes y saturados
- **Background:** Gradientes sutiles o patrones geométricos
- **Partículas:** Para gravedad, portales, estrellas

### 6.2 Assets Necesarios

**Sprites/Texturas:**
- Bola del jugador (con sombra)
- Plataformas (normal, hielo, pegamento)
- Trampolines (3 frames de animación)
- Portales (sprite animado)
- Pinchos
- Estrellas (animadas)
- Meta (animada o con partículas)
- Indicadores de gravedad

**Efectos de Partículas:**
- Trail de la bola
- Explosión al recolectar estrella
- Indicador de dirección de gravedad
- Portal warp effect
- Impacto en paredes

### 6.3 Sonido

**Música:**
- Tema principal (menú)
- Track de juego (loop, ritmo relajante)
- Track de victoria
- Track de mundo bonus (más dinámico)

**Efectos de Sonido:**
- Cambio de gravedad (4 variaciones sutiles)
- Bola rodando (loop)
- Bola rebotando
- Recolectar estrella
- Tocar meta
- Tocar pinchos/muerte
- Trampolín
- Portal (entrada y salida)
- Click de UI
- Victoria de nivel

---

## 7. Fases de Desarrollo

### Fase 1: Prototipo Básico (1-2 semanas)
- Setup del proyecto
- Física básica de la bola
- Control de gravedad (4 direcciones)
- 3 niveles de prueba
- Plataformas estáticas
- Punto de inicio y meta

### Fase 2: Mecánicas Core (2-3 semanas)
- Superficies especiales (hielo, pegamento)
- Pinchos y zonas de reset
- Sistema de checkpoint (opcional)
- 10-15 niveles funcionales
- UI básica

### Fase 3: Contenido Expandido (2-3 semanas)
- Trampolines
- Portales
- Plataformas móviles y temporales
- Sistema de estrellas
- 30+ niveles
- Mundo 1-3 completo

### Fase 4: Polish y Contenido Final (2-3 semanas)
- Arte final y animaciones
- Sonido completo
- Mundos 4-6
- Niveles bonus
- Sistema de guardado
- Menús completos

### Fase 5: Testing y Balance (1-2 semanas)
- Playtesting
- Ajuste de dificultad
- Bug fixing
- Optimización de performance
- Tutorial mejorado

### Fase 6: Release (1 semana)
- Builds finales
- Documentación
- Marketing assets
- Deploy

---

## 8. Características Adicionales (Post-Launch)

### 8.1 Editor de Niveles
- Interfaz drag-and-drop
- Compartir niveles con código
- Sistema de rating comunitario
- Niveles destacados semanales

### 8.2 Modos de Juego
- **Modo Speedrun:** Temporizador global
- **Modo Rotación Limitada:** Solo X cambios de gravedad
- **Modo Perfecto:** Recolectar todo sin morir
- **Modo Infinito:** Niveles procedurales

### 8.3 Social
- Tablas de clasificación por nivel
- Compartir replays
- Desafíos diarios
- Logros/achievements

### 8.4 Monetización (Opcional)
- Versión gratuita: Mundos 1-3
- Premium: Mundos 4-6 + bonus
- Sin anuncios
- Packs de niveles adicionales

---

## 9. Métricas de Éxito

### KPIs a medir:
- Tasa de completación por nivel
- Tiempo promedio por nivel
- Porcentaje de jugadores que obtienen 3 estrellas
- Retención (día 1, día 7, día 30)
- Nivel donde los jugadores abandonan más
- Uso de hint/skip si se implementa

### Analytics a implementar:
- Heatmaps de muerte (dónde mueren más los jugadores)
- Patrones de rotación de gravedad
- Niveles más rejugados

---

## 10. Consideraciones de Diseño

### Balance de Dificultad
- Curva suave en Mundo 1
- Incremento gradual de complejidad
- Cada mundo introduce 1-2 mecánicas nuevas
- Niveles finales requieren dominio de todas las mecánicas

### Accesibilidad
- Tutorial visual claro
- Opción de skip de niveles muy difíciles
- Colorblind mode
- Controles remapeables
- Opciones de velocidad de juego

### Feedback al Jugador
- Respuesta inmediata a acciones
- Animaciones claras de estado
- Sonido distintivo por interacción
- Visual cues para próximos peligros

---

## 11. Riesgos y Mitigación

### Riesgos Técnicos
- **Física inconsistente:** Usar motor establecido, mucho testing
- **Performance con muchos objetos:** Optimización, object pooling
- **Sincronización gravedad-física:** Update loop bien estructurado

### Riesgos de Diseño
- **Curva de dificultad muy empinada:** Playtesting extensivo
- **Mecánicas confusas:** Tutorial incremental y claro
- **Falta de variedad:** Iterar en mecánicas nuevas

### Riesgos de Scope
- **Demasiados niveles planeados:** Priorizar calidad sobre cantidad
- **Feature creep:** Mantener documento de scope, fase de polish dedicada

---

## 12. Referencias e Inspiración

**Juegos similares:**
- Shift (puzzle de gravedad)
- VVVVVV (gravedad vertical)
- World of Goo (física)
- Celeste (plataformas precisas)
- Super Meat Boy (dificultad justa)

**Mecánicas a estudiar:**
- Control de gravedad fluido
- Feedback táctil satisfactorio
- Progresión de dificultad
- Coleccionables opcionales

---

## Conclusión

Gravity Shift combina mecánicas simples de control de gravedad con puzzles de física complejos y satisfactorios. El juego debe sentirse justo: cada fallo es culpa del jugador, no del juego. La clave está en el balance entre desafío y accesibilidad, con opcionales (estrellas, speedrun) para jugadores hardcore.

**Tiempo estimado de desarrollo:** 10-16 semanas para equipo de 2-3 personas
**Complejidad:** Media
**Potencial:** Alto - mecánica única con mucha profundidad
