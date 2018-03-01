from Arduino import Arduino
import time

"""
File: color.py
Author: Antony Nguyen
Description: A program to test the color recognition sensor
             TCS230 TCS3200 when connected to an Arduino
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
red = 0
green = 0
blue = 0
colors = [red, green, blue]

# Setup the Arduino

Arduino = Arduino('9600')

# Setup the pinModes
Arduino.pinMode(s0, 'OUTPUT')
Arduino.pinMode(s1, 'OUTPUT')
Arduino.pinMode(s2, 'OUTPUT')
Arduino.pinMode(s3, 'OUTPUT')
Arduino.pinMode(out, 'INPUT')
Arduino.digitalWrite(s0, 'HIGH')
Arduino.digitalWrite(s1, 'HIGH')

# Color
def color():
    Arduino.digitalWrite(s2, 'LOW')
    Arduino.digitalWrite(s3, 'LOW')
    # count OUT, pRed, RED
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    r = Arduino.pulseIn(out, lorh)
    Arduino.digitalWrite(s3, 'HIGH')
    # count OUT, pBlue, BLUE
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    b = Arduino.pulseIn(out, lorh)
    Arduino.digitalWrite(s2, 'HIGH')
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    # count OUT, pGreen, GREEN
    g = Arduino.pulseIn(out, lorh)
    return [r, g, b] 


# Main execution loop
while True:
    colors = color()
    red = colors[0]
    green = colors[1]
    blue = colors[2]
    print(red)
    print(green)
    print(blue)
    if(red < blue and red < green and red < 20):
        print('Red')
    elif(blue < red and blue < green and blue < 20):
        print('Blue')
    elif(green < red and green < blue and green < 20):
        print('Green')
    time.sleep(.5)
print("\nClosing program...")
