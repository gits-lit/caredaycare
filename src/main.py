from Arduino import Arduino
from parts import color
import time

"""
File: main.py
Author: Antony Nguyen
Description: Main driver for Arduino pill dispenser.
             Sorts pills based on color
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
servo = 2
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

# Connect the Servo object to a pin
Arduino.Servos.attach(servo)

# Main execution loop
while True:
    colors = color.rgb(Arduino, s2, s3, out)
    red = colors[0]
    green = colors[1]
    blue = colors[2]
    if(red < blue and red < green and red < 20):
        print('Red')
        Arduino.Servos.write(servo, 0);
    elif(blue < red and blue < green and blue < 20):
        print('Blue')
        Arduino.Servos.write(servo, 180);
    time.sleep(.5)
print("\nClosing program...")
