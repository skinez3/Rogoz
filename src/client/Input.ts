import Vector from '../lib/Vector'

class Input {
    up: boolean
    down: boolean
    left: boolean
    right: boolean

    mouseDown: boolean
    mouseCoords: Vector
    canvasOffset: Vector

    constructor() {
        this.up = false
        this.down = false
        this.left = false
        this.right = false

        this.mouseDown = false
        this.mouseCoords = Vector.zero()
        this.canvasOffset = Vector.zero()
    }

    static create(
        keyElement: HTMLElement,
        mouseTrackerElement: HTMLCanvasElement,
    ): Input {
        const input = new Input()
        input.applyEventHandlers(keyElement, mouseTrackerElement)
        return input
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.code) {
            case 'KeyA':
            case 'ArrowLeft':
                this.left = true
                break
            case 'KeyW':
            case 'ArrowUp':
                this.up = true
                break
            case 'KeyD':
            case 'ArrowRight':
                this.right = true
                break
            case 'KeyS':
            case 'ArrowDown':
                this.down = true
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.code) {
            case 'KeyA':
            case 'ArrowLeft':
                this.left = false
                break
            case 'KeyW':
            case 'ArrowUp':
                this.up = false
                break
            case 'KeyD':
            case 'ArrowRight':
                this.right = false
                break
            case 'KeyS':
            case 'ArrowDown':
                this.down = false
                break
        }
    }

    onMouseDown(event: MouseEvent): void {
        if (event.button === 0) {
            this.mouseDown = true
        }
    }

    onMouseUp(event: MouseEvent): void {
        if (event.button === 0) {
            this.mouseDown = false
        }
    }

    onMouseMove(event: MouseEvent): void {
        this.mouseCoords = new Vector(event.offsetX, event.offsetY).sub(
            this.canvasOffset,
        )
    }

    applyMobileHandlers(): void {
        const bindButton = (id: string, keyField: 'up' | 'down' | 'left' | 'right' | 'mouseDown') => {
            const btn = document.getElementById(id)
            if (!btn) return

            // Touch events for mobile devices
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault()
                this[keyField] = true
            })
            btn.addEventListener('touchend', (e) => {
                e.preventDefault()
                this[keyField] = false
            })

            // Mouse events for testing the UI on desktop
            btn.addEventListener('mousedown', () => { this[keyField] = true })
            btn.addEventListener('mouseup', () => { this[keyField] = false })
            btn.addEventListener('mouseleave', () => { this[keyField] = false })
        }

        bindButton('btn-up', 'up')
        bindButton('btn-down', 'down')
        bindButton('btn-left', 'left')
        bindButton('btn-right', 'right')
        bindButton('btn-shoot', 'mouseDown')
    }

    applyEventHandlers(
        keyElement: HTMLElement,
        mouseTrackerElement: HTMLCanvasElement,
    ): void {
        keyElement.addEventListener('keydown', this.onKeyDown.bind(this))
        keyElement.addEventListener('keyup', this.onKeyUp.bind(this))
        mouseTrackerElement.addEventListener('mousedown', this.onMouseDown.bind(this))
        mouseTrackerElement.addEventListener('mouseup', this.onMouseUp.bind(this))
        mouseTrackerElement.addEventListener('mousemove', this.onMouseMove.bind(this))

        // Helper to calculate mouseCoords relative to the canvas from a Touch event
        const updateTouchCoords = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0]
                const rect = mouseTrackerElement.getBoundingClientRect()
                this.mouseCoords = new Vector(
                    touch.clientX - rect.left,
                    touch.clientY - rect.top,
                ).sub(this.canvasOffset)
            }
        }

        // Touch handlers: touching canvas aims and shoots immediately
        mouseTrackerElement.addEventListener('touchstart', (e) => {
            e.preventDefault()
            updateTouchCoords(e)
            this.mouseDown = true
        }, { passive: false })

        mouseTrackerElement.addEventListener('touchmove', (e) => {
            e.preventDefault()
            updateTouchCoords(e)
        }, { passive: false })

        mouseTrackerElement.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.mouseDown = false
        }, { passive: false })

        mouseTrackerElement.addEventListener('touchcancel', (e) => {
            e.preventDefault()
            this.mouseDown = false
        }, { passive: false })

        this.canvasOffset = new Vector(
            mouseTrackerElement.offsetLeft,
            mouseTrackerElement.offsetTop,
        )

        // Bind bottom interface buttons
        this.applyMobileHandlers()
    }
}
export default Input
