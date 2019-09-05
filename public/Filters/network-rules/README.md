# $network rules test 

## Case 1
* There is an image `<img src="https://scp001.surge.sh/adg1.png">`
* Applied `$network` rule for `surge.sh` IP address 
#### Expecting result: image has blocked

## Case 2
* There is an image `<img src="http://panoramic.pro/sites/default/files/panoramas/nagore.jpg">`
* Applied `$network` rule for `panoramic.pro` IP address
* Applied `$network` exception rule for `panoramic.pro` IP address
#### Expecting result: image hasn't blocked