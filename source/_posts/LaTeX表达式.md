---
title: LaTeX表达式
date: 2023-10-06 13:32:01
tags:
- 数学
- LaTeX
excerpt: LaTeX 表达式语法
mathjax: true
---
## 字母

```
a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```

$a b c d e f g h i j k l m n o p q r s t u v w x y z$
$A B C D E F G H I J K L M N O P Q R S T U V W X Y Z$

|       希腊字母小写/大写       |        LaTeX形式        |   希腊字母小写/大写   |     LaTeX形式     |
| :---------------------------: | :---------------------: | :--------------------: | :---------------: |
|         $\alpha\ A$         |        \alpha A        |       $\mu\ N$       |       \mu N       |
|         $\beta\ B$         |         \beta B         |      $\xi\ \Xi$      |      \xi \Xi      |
|      $\gamma\ \Gamma$      |      \gamma \Gamma      |        $o\ O$        |        o O        |
|      $\delta\ \Delta$      |      \delta \Delta      |      $\pi\ \Pi$      |      \pi \Pi      |
| $\epsilon\ \varepsilon\ E$ | \epsilon \varepsilon E |  $\rho\ \varrho\ P$  |  \rho \varrho P  |
|         $\zeta\ Z$         |         \zeta Z         |   $\sigma\ \Sigma$   |   \sigma \Sigma   |
|          $\eta\ H$          |         \eta H         |      $\tau\ T$      |      \tau T      |
| $\theta\ \vartheta\ \Theta$ | \theta \vartheta \Theta | $\upsilon\ \Upsilon$ | \upsilon \Upsilon |
|         $\iota\ I$         |         \iota I         |      $\chi\ X$      |      \chi X      |
|     $\lambda\ \Lambda$     |     \lambda \Lambda     |     $\psi\ \Psi$     |     \psi \Psi     |

## 上标

|       符号       |  LaTeX形式  |       符号       |   LaTeX形式   |
| :--------------: | :----------: | :---------------: | :-----------: |
|   $\hat{a}$   |   \hat{a}   |  $\widehat{a}$  |  \widehat{a}  |
|   $\ddot{a}$   |   \ddot{a}   |    $\dot{a}$    |    \dot{a}    |
|   $\bar{a}$   |   \bar{a}   |   $\check{a}$   |   \check{a}   |
|   $\vec{a}$   |   \vec{a}   |   $\tilde{a}$   |   \tilde{a}   |
|  $\grave{a}$  |  \grave{a}  |   $\acute{a}$   |   \acute{a}   |
|  $\breve{a}$  |  \breve{a}  | $\widetilde{a}$ | \widetilde{a} |
| $\overline{a}$ | \overline{a} |     $\sim$     |     \sim     |

## 符号

|                 符号                 |             LaTeX形式             |               符号               |          LaTeX形式          |
| :-----------------------------------: | :-------------------------------: | :------------------------------: | :--------------------------: |
|              $\times$              |              \times              |             $\div$             |             \div             |
|            $\bigcap_1^6$            |            \bigcap_1^6            |       $\bigcap_{1}^{n}$       |       \bigcap_{1}^{n}       |
|            $\bigcup_1^6$            |            \bigcup_1^6            |       $\bigcup_{1}^{n}$       |       \bigcup_{1}^{n}       |
|             $\binom53$             |             \binom53             |         $\binom{5}{3}$         |         \binom{5}{3}         |
|              $\forall$              |              \forall              |           $\exists$           |           \exists           |
|             $\partial$             |             \partial             |           $\propto$           |           \propto           |
|      $\left \\\{ \right \\\}$      |       \left\\\{ \right \\\}       | $\left \langle \right \rangle$ | \left \langle \right \rangle |
|            $\sqrt{100}$            |            \sqrt{100}            |        $\sqrt[3]{1000}$        |        \sqrt[3]{1000}        |
| $\mathop{\lim}_{n \to \infty }f(x)$ | \mathop{\lim}_{n \to \infty }f(x) |         $\frac{3}{7}$         |         \frac{3}{7}         |
|        $\sum_{n=0}^{\infty}$        |        \sum_{n=0}^{\infty}        |        $\int_a^bf(x)dx$        |        \int_a^bf(x)dx        |
|               $\int$               |               \int               |            $\oint$            |            \oint            |
|              $\oiint$              |              \oiint              |           $\oiiint$           |           \oiiint           |

## 矩阵

```
# 矩阵的输入，其中"\cdots"为省略号，"\newline"为换行，"&"为对齐符号
A_{m,n} = 
\begin{pmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1,n} \newline
a_{2,1} & a_{2,2} & \cdots & a_{2,n} \newline
\vdots & \vdots & \ddots & \vdots    \newline
a_{m,1} & a_{m,2} & \cdots & a_{m,n} 
\end{pmatrix}
```

$$
A_{m,n} = 
\begin{pmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1,n} \newline
a_{2,1} & a_{2,2} & \cdots & a_{2,n} \newline
\vdots & \vdots & \ddots & \vdots    \newline
a_{m,1} & a_{m,2} & \cdots & a_{m,n} 
\end{pmatrix}
$$

## 方程/方程组

```
i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^2}{2m}\nabla^2\psi+V\psi
```

$$
i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^2}{2m}\nabla^2\psi+V\psi
$$

```
# 麦克斯韦方程组
\begin{cases}{}
\oint_l{Hdl}=\int_s{jds}+\int_s{\frac{\partial D}{\partial t}ds} \newline
\oint_l{Edl}=-\int_s{\frac{\partial B}{\partial t}}\newline
\oint_s{ds}=0 \newline
\oint_s{Dds}=\int_v{\rho dv}
\end{cases}
```

$$
\begin{cases}{}
\oint_l{Hdl}=\int_s{jds}+\int_s{\frac{\partial D}{\partial t}ds} \newline 
\oint_l{Edl}=-\int_s{\frac{\partial B}{\partial t}}\newline
\oint_s{ds}=0 \newline 
\oint_s{Dds}=\int_v{\rho dv}
\end{cases}
$$
