from Arduino import Arduino
import time
import sys
from threading import Timer

"""
File: servo.py
Author: Antony Nguyen
Description: A function that controls a servo
"""

def rotate90():
    Arduino.Servos.write(sys.argv[1], 90)

# Connect to the Arduino
Arduino = Arduino('9600')

# Connect the Servo object to a pin
Arduino.Servos.attach(sys.argv[1])

# Main execution loop
try:
    Arduino.Servos.write(sys.argv[1], sys.argv[2])
    threading.Timer(1, rotate90)
except:
    print("\nUnable to rotate to that angle")
