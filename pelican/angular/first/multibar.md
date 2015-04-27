A D3 bar chart that illustrates how to assemble 
multi-series data into bar charts.

<br />
<br />

This contains a dictionary with a single 
x value and multiple corresponding y values.
Here is a generic example: 

<pre>
data = [

    { x : 0.0,      y1 : 1.0,   y2: 0.0,    y3: 2.0 },
    { x : 1.0,      y1 : 1.1,   y2: 0.1,    y3: 4.0 },
    { x : 2.0,      y1 : 1.2,   y2: 0.2,    y3: 8.0 },
    { x : 3.0,      y1 : 1.4,   y2: 0.2,    y3: 16.0 },
    { x : 4.0,      y1 : 1.8,   y2: 0.1,    y3: 32.0 },
            
    [...]

]
</pre>

More specifically, for this data set, we have one index variable,
which is the letter. We have two y values, 
"total frequency" and "first letter frequency."
These values correspond to the total frequency of a given letter 
across all letters that appear in everyday English language (total value),
and the frequency that a given letter will appear as the first letter
of a word in everyday English language (first letter frequency).

<br />
<br />

The data structure is:

<pre>
data = [
    { 'letter' : 'A', 'firstletterfrequency' : 0.11602, 'frequency' : .08167 }, 
    { 'letter' : 'B', 'firstletterfrequency' : 0.04702, 'frequency' : .01492 },
    { 'letter' : 'C', 'firstletterfrequency' : 0.03511, 'frequency' : .02782 },
    { 'letter' : 'D', 'firstletterfrequency' : 0.02670, 'frequency' : .04253 },
    { 'letter' : 'E', 'firstletterfrequency' : 0.02007, 'frequency' : .12702 },
    { 'letter' : 'F', 'firstletterfrequency' : 0.03779, 'frequency' : .02288 },
            
    [...]

]
</pre>



