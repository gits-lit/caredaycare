from Arduino import Arduino
import time
import sys
from threading import Timer

"""
File: servo.py
Author: Antony Nguyen
Description: A function that controls a servo
"""

def rotate80():
    Arduino.Servos.write(3, 80)

# Connect to the Arduino
Arduino = Arduino('9600')

# Connect the Servo object to a pin
Arduino.Servos.attach(3)

# Main execution loop
try:
    count = 0
    while count < 6:
        if count % 2 == 0: 
            Arduino.Servos.write(3, 20 )
            Timer(1,rotate80).start()
        else:
            Arduino.Servos.write(3, 110 )
            Timer(1,rotate80).start()
except:
    print("\nUnable to rotate to that angle")
