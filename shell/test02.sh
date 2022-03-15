#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

# a=10
# b=20

# if [ $a == $b ]
# then
#    echo "$a -eq $b : a 等于 b"
# else
#    echo "$a -eq $b: a 不等于 b"
# fi

demoFun(){
    echo "这是我的第一个 shell 函数!"
    return 10
}

a=`demoFun 3`

echo "$?"

echo `demoFun`