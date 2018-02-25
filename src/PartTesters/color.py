from Arduino import Arduino
import time

"""
File: color.py
Author: Antony Nguyen
Description: A program to test the color recognition sensor
             TCS230 TCS3200 when connected to an Arduino
             using Nanpy
More Credit: Edgaras Art for original Arduino code which
             I translated into python and modified.
             https://www.youtube.com/watch?v=BERHEVgaX40
"""

"""
Color Sensor   Arduino
------------   -------
VCC            5V
GND            GND
s0             8
s1             9
s2             12
s3             11
OUT            10
OE             GND
"""

s0 = 8
s1 = 9
s2 = 12
s3 = 11
out = 10

# Color Variables
r = 0
g = 0
b = 0
colors = [r, g, b]

a = Arduino('9600')

# Setup the pinModes
a.pinMode(s0, "OUTPUT")
a.pinMode(s1, "OUTPUT")
a.pinMode(s2, "OUTPUT")
a.pinMode(s3, "OUTPUT")
a.pinMode(out, "INPUT")
a.digitalWrite(s0, "HIGH")
a.digitalWrite(s1, "HIGH")

# Color
def color():
    a.digitalWrite(s2, "LOW")
    a.digitalWrite(s3, "LOW")
    # count OUT, pRed, RED
    r = a.pulseIn(out, "HIGH")
    a.digitalWrite(s3, "HIGH")
    # count OUT, pBlue, BLUE
    b = a.pulseIn(out, "HIGH")
    a.digitalWrite(s2, "HIGH")
    # count OUT, pGreen, GREEN
    g = a.pulseIn(out, "HIGH")
    return [r, g, b] 

# Main execution loop
while True:
    colors = color()
    r = colors[0]
    g = colors[1]
    b = colors[2]
    print("R: ")
    print(r)
    print("G: ")
    print(g)
    print("B: ")
    print(b)  
    time.sleep(.5)
    print("\nClosing program...")
