"""
File: color.py
Author: Antony Nguyen
Description: Reads the colors from a TCS230 TCS3200 Color
             Sensor and returns r,g,b intensity values.
             Utilizes Arduino Python Command API
Date: February 28, 2018 
"""

from Arduino import Arduino
import time

"""
Method: color.py
Author: Antony Nguyen
Description: Reads the colors from a TCS230 TCS3200 Color
             Sensor and returns r,g,b intensity values.
             Utilizes Arduino Python Command API
Date: February 28, 2018 
Parameters - pin1 -s2
             pin2 -s3
Returns: Array of values
         r - red
         g - green
         b = blue
"""

def rgb(Arduino, pin1, pin2, out):
    Arduino.digitalWrite(pin1, 'LOW')
    Arduino.digitalWrite(pin2, 'LOW')
    # count OUT, pRed, RED
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    r = Arduino.pulseIn(out, lorh)
    Arduino.digitalWrite(pin2, 'HIGH')
    # count OUT, pBlue, BLUE
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    b = Arduino.pulseIn(out, lorh)
    Arduino.digitalWrite(pin1, 'HIGH')
    if(Arduino.digitalRead(out) == 1):
      lorh = 'LOW'
    else:
      lorh = 'HIGH'
    # count OUT, pGreen, GREEN
    g = Arduino.pulseIn(out, lorh)
    return [r, g, b] 
