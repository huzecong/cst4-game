for x in `ls orig/`
do
    convert orig/$x -background white -gravity Center -append -extent 40x40 -border 0 $x
done
