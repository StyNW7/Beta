"use client"

import { useEffect, useRef } from "react"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Indonesian cultural elements
    const elements: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
      shape: "circle" | "triangle" | "diamond"
    }[] = []

    const colors = [
      "rgba(239, 68, 68, 0.6)", // Red
      "rgba(255, 255, 255, 0.8)", // White
      "rgba(220, 38, 38, 0.5)", // Dark red
      "rgba(254, 202, 202, 0.7)", // Light red
    ]

    const createElements = () => {
      const elementCount = Math.min(window.innerWidth / 15, 80)

      for (let i = 0; i < elementCount; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: ["circle", "triangle", "diamond"][Math.floor(Math.random() * 3)] as "circle" | "triangle" | "diamond",
        })
      }
    }

    createElements()

    const drawShape = (element: (typeof elements)[0]) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      switch (element.shape) {
        case "circle":
          ctx.beginPath()
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(element.x, element.y - element.size)
          ctx.lineTo(element.x - element.size, element.y + element.size)
          ctx.lineTo(element.x + element.size, element.y + element.size)
          ctx.closePath()
          ctx.fill()
          break
        case "diamond":
          ctx.beginPath()
          ctx.moveTo(element.x, element.y - element.size)
          ctx.lineTo(element.x + element.size, element.y)
          ctx.lineTo(element.x, element.y + element.size)
          ctx.lineTo(element.x - element.size, element.y)
          ctx.closePath()
          ctx.fill()
          break
      }
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element) => {
        element.x += element.speedX
        element.y += element.speedY

        if (element.x < 0) element.x = canvas.width
        if (element.x > canvas.width) element.x = 0
        if (element.y < 0) element.y = canvas.height
        if (element.y > canvas.height) element.y = 0

        drawShape(element)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-60" aria-hidden="true" />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)
          `,
        }}
      />
    </>
  )
}
