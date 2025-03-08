/**
 *  cursor follower js
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // cursor follower
    const hoverCursor = document.querySelectorAll('.hover-cursor')
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    const cursorNone = document.querySelectorAll('.custom-cursor-none')
    const cursorSmall = document.querySelectorAll('.cursor-effect-small')
    const cursorMedium = document.querySelectorAll('.cursor-effect-medium')
    const cursorLarge = document.querySelectorAll('.cursor-effect-large')
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    if (cursor && cursorFollower) {
        function moveFollower() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            cursorFollower.style.left = `${posX - 20}px`;
            cursorFollower.style.top = `${posY - 20}px`;
            requestAnimationFrame(moveFollower);
        }
        document.addEventListener("mousemove", (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });
        moveFollower();
    }
    if (hoverCursor) {
        hoverCursor.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                const hoverText = el.getAttribute('data-hover-text')
                if (hoverText && cursor && cursorFollower) {
                    cursor.setAttribute('data-text', hoverText)
                    cursor.classList.add("active");
                    cursorFollower.classList.add("active")
                };
            });
            el.addEventListener("mouseleave", () => {
                if (cursor && cursorFollower) {
                    cursor.classList.remove("active");
                    cursorFollower.classList.remove("active")
                }
            });
        });
    }
    if (cursorNone && cursor && cursorFollower) {
        cursorNone.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hide')
                cursorFollower.classList.add('hide')
            })
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hide')
                cursorFollower.classList.remove('hide')
            })

        })
    }
    if (cursorSmall && cursor && cursorFollower) {
        cursorSmall.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-small')
                cursorFollower.classList.add('cursor-small')
            })
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-small')
                cursorFollower.classList.remove('cursor-small')
            })
        })
    }
    if (cursorMedium && cursor && cursorFollower) {
        cursorMedium.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-medium')
                cursorFollower.classList.add('cursor-medium')
            })
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-medium')
                cursorFollower.classList.remove('cursor-medium')
            })
        })
    }
    if (cursorLarge && cursor && cursorFollower) {
        cursorLarge.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-large')
                cursorFollower.classList.add('cursor-large')
            })
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-large')
                cursorFollower.classList.remove('cursor-large')
            })
        })
    }

})