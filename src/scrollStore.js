// ============================================================
// SCROLL STORE — Module-level shared state
// Bridges GSAP ScrollTrigger (DOM) and R3F useFrame (Canvas)
// ============================================================

export const scrollStore = {
  progress: 0,          // 0..1 global scroll progress
  activeSection: 0,     // 0..7 current section index
  targetSection: -1,    // -1 = no jump target; >=0 = jump to section
  _listeners: new Set(),

  setProgress(p) {
    this.progress = Math.max(0, Math.min(1, p))
    const section = Math.min(Math.floor(this.progress * 8), 7)
    if (section !== this.activeSection) {
      this.activeSection = section
      this._listeners.forEach(fn => fn(section, this.progress))
    }
  },

  subscribe(fn) {
    this._listeners.add(fn)
    return () => this._listeners.delete(fn)
  },
}
