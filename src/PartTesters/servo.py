from nanpy import (ArduinoApi, SerialManager)
from nanpy import Servo
import time

"""
File: servo.py
Author: Antony Nguyen
Description: A program to test servos connected to an
             Arduino using Nanpy. Prompts the user to 
             repeatedly enter angle values that the
             servo will turn to.
"""

servoPin = 2

# Try to connect to the Arduino
try:
    connection = SerialManager()
    a = ArduinoApi(connection = connection)
except:
    print("Failed to connect to Arduino")

# Connect the Servo object to a pin
servo = Servo(servoPin)

# Main execution loop
try:
    while True:
        angle = input("Enter a value to rotate to: ")
        print("Setting servo to ", angle)
        servo.write(angle)
        time.sleep(1)
except:
    print("\nClosing program...")
