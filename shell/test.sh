#!/bin/bash
echo "Hello World !"

# 变量
your_name="wuwei"
echo $your_name
echo "my name is ${your_name}"
your_name="jiaojiao"
echo ${your_name}

# readonly
# readonly your_name
# your_name="hah"

# 删除变量
# unset your_name
# echo "${your_name}被删除了"

# 双引号里可以有变量，单引号不行
echo "my name is ${your_name}" # my name is jiaojiao
echo 'my name is ${your_name}' # my name is ${your_name}

# 获取字符串长度
echo ${#your_name} # 8

# 提取子字符串
echo ${your_name:1:4} # iaoj  从索引为1的开始截取4个

# 查找子字符串
# 查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：
# expr index "$your_name" io

# 定义数组
# bash支持一维数组（不支持多维数组），并且没有限定数组的大小。
arr=(1 2 3 4 5)
arr[0]=a
echo "${arr[0]}"
# 使用 @ 符号可以获取数组中的所有元素
echo "${arr[@]}"
# 取得数组元素的个数
echo "${#arr[@]}"

:<<! 多段注释
床前明月光，
疑是地上霜
!

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";

echo "参数个数为：$#";
echo "传递的参数作为一个字符串显示：$*";

# $* 与 $@ 区别：
# 相同点：都是引用所有参数。
# 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

# shell 基本运算
# 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
# 表达式要被()包含 + - * / % = == !=
val=$((11 + 10))
echo "两数之和为 : $val"

# 关系运算符
# -eq 等于；-gt 大于；-lt小于；-ne不等于；-ge大于等于；-le小于等于
a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi

# 布尔运算符
# !非 -o或 -a与

# 逻辑运算符
# && 逻辑与 || 逻辑或

# 字符串运算符
# 下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：
# =	检测两个字符串是否相等，相等返回 true。	[ $a = $b ] 返回 false。
# !=	检测两个字符串是否不相等，不相等返回 true。	[ $a != $b ] 返回 true。
# -z	检测字符串长度是否为0，为0返回 true。	[ -z $a ] 返回 false。
# -n	检测字符串长度是否不为 0，不为 0 返回 true。	[ -n "$a" ] 返回 true。
# $	检测字符串是否为空，不为空返回 true。	[ $a ] 返回 true。

# 文件测试运算符

# echo命令
# 显示不换行
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
# 显示结果定向至文件
myfile="./myfile.sh"
echo "It is a test" > $myfile
# '' 不取变量不转义

# 显示命令执行结果
date
whoami

# printf 命令
# %s %c %d %f 都是格式替代符，％s 输出一个字符串，％d 整型输出，％c 输出一个字符，％f 输出实数，以小数形式输出。
# %-10s 指一个宽度为 10 个字符（- 表示左对齐，没有则表示右对齐），任何字符都会被显示在 10 个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。
# %-4.2f 指格式化为小数，其中 .2 指保留2位小数。
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876
# format-string为双引号
printf "%d %s\n" 1 "abc"
# 单引号与双引号效果一样
printf '%d %s\n' 1 "abc"
# 没有引号也可以输出
printf %s abcdef
# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
printf %s abc def
printf "%s\n" abc def
printf "%s %s %s\n" a b c d e f g h i j
# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
printf "%s and %d \n"

# test
a=5
b=6

result=$((a+b)) # 注意等号两边不能有空格
echo "result 为： $result"

# if else
# fi
if [ "$(ps -ef | grep -c "bash")" -gt 1 ]; then echo "true"; fi

# if else-if else
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi

# while 语句
num1=$((2*3))
num2=$((1+5))
if test ${num1} -eq ${num2}
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi

# while 语句
int=1
while ((int <= 5))
do
    echo ${int}
    ((int++)) 
done

# while循环可用于读取键盘信息。下面的例子中，输入信息被设置为变量FILM，按<Ctrl-D>结束循环。 之后会继续执行下面的语句

# echo '按下 <CTRL-D> 退出'
# echo -n '输入你最喜欢的网站名: '
# while read FILM
# do
#     echo "是的！$FILM 是一个好网站"
# done

# until 循环
# until 循环执行一系列命令直至条件为 true 时停止。
# until 循环与 while 循环在处理方式上刚好相反。

# case ... esac
# case ... esac 为多选择语句，与其他语言中的 switch ... case 语句类似，是一种多分枝选择结构，每个 case 分支用右圆括号开始，用两个分号 ;; 表示 break，即执行结束，跳出整个 case ... esac 语句，esac（就是 case 反过来）作为结束标记。
# 可以用 case 语句匹配一个值与一个模式，如果匹配成功，执行相匹配的命令。
# echo '输入 1 到 4 之间的数字:'
# echo '你输入的数字为:'
# read -r aNum
# case $aNum in
#     1)  echo '你选择了 1'
#     ;;
#     2)  echo '你选择了 2'
#     ;;
#     3)  echo '你选择了 3'
#     ;;
#     4)  echo '你选择了 4'
#     ;;
#     *)  echo '你没有输入 1 到 4 之间的数字'
#     ;;
# esac

# 跳出循环
# break命令允许跳出所有循环（终止执行后面的所有循环）
# while :
# do
#     echo -n "输入 1 到 5 之间的数字:"
#     read -r aNum
#     case $aNum in
#         1|2|3|4|5) echo "你输入的数字为 $aNum!"
#         ;;
#         *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
#             break
#         ;;
#     esac
# done

# continue
# continue命令与break命令类似，只有一点差别，它不会跳出所有循环，仅仅跳出当前循环。

# Shell 函数
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
# 函数返回值在调用该函数后通过 $? 来获得。
# funWithReturn(){
#     echo "这个函数会对输入的两个数字进行相加运算..."
#     echo "输入第一个数字: "
#     read -r aNum
#     echo "输入第二个数字: "
#     read anotherNum
#     echo "两个数字分别为 $aNum 和 $anotherNum !"
#     return $(($aNum+$anotherNum))
# }
# funWithReturn
# echo "输入的两个数字之和为 $? !"
# 在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个参数
# 注意，$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73

# 输入/输出重定向
# 输出重定向
# command > file	将输出重定向到 file。
# command < file	将输入重定向到 file。
# command >> file	将输出以追加的方式重定向到 file。
# echo "菜鸟教程：www.runoob.com" >> users
# 输入重定向
# 和输出重定向一样，Unix 命令也可以从文件获取输入
# 统计 users 文件的行数
wc -l < users
#读取users文件的信息写入到outfile
cat < users > outfile

