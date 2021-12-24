## 运行shell脚本的两种方法
### 作为可执行程序
> 将上面的代码保存为 test.sh，并 cd 到相应目录：<br>
> 
> chmod +x ./test.sh  #使脚本具有执行权限 <br>
> ./test.sh  #执行脚本 <br>
> 
> ps: *注意，一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。*

### 作为解释器参数
> 这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：<br>
> 
> /bin/sh test.sh <br>
> /bin/php test.php <br>
> 
> 这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

## 