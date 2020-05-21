# Kahn TopoSort Visual
**Herramienta para visualizar el algoritmo de Kahn para el Ordenamiento Topológico**

¡Bienvenido! Esta es una herramienta útil para visualizar el algoritmo de Kahn para obtener el Orden Topológico de un Grafo Acíclico Dirigido. La herramienta está construida en **JavaScript**, utilzando la librería **p5.js** para el manejo de los gráficos.

Puedes consultarla haciendo click [aquí](https://arrobaricardoge.github.io/Kahn-TopoSort-Visual/). Espero que te resulte útil, así como lo fue para mí al construirla. ¡Diviértete!

## Orden topológico

Una definición que es corta y precisa de lo que es el orden topológico es la proporcionada por Steven y Felix Halim en el libro “Competitive Programming 3: The New Lower Bound of Programming Contests”, que es la siguiente:
>El orden topológico de un [Grafo Acíclico Dirigido](https://es.wikipedia.org/wiki/Grafo_ac%C3%ADclico_dirigido) **(DAG)** es un ordenamiento lineal de sus vértices de tal forma que el vértice ![$u$](https://render.githubusercontent.com/render/math?math=%24u%24) va antes que el vértice ![$v$](https://render.githubusercontent.com/render/math?math=%24v%24) si la arista  ![$u \rightarrow v$](https://render.githubusercontent.com/render/math?math=%24u%20%5Crightarrow%20v%24) existe en el **DAG**.

Trataremos de deducir el algoritmo a través del siguiente problema.

## El problema de la fábrica

_En una fábrica existen ![$n$](https://render.githubusercontent.com/render/math?math=%24n%24) diferentes tareas que se tienen que llevar a cabo, sin embargo, hay algunas tareas que tienen una serie de tareas requisito que se tienen que completar antes de poder ejecutarlas. Las tareas están numeradas del 1 al ![$n$](https://render.githubusercontent.com/render/math?math=%24n%24), y al jefe de la fábrica le interesa que se les dé prioridad a las tareas que son más importantes, (la tarea ![$i$](https://render.githubusercontent.com/render/math?math=%24i%24) es más importante que la tarea ![$j$](https://render.githubusercontent.com/render/math?math=%24j%24)  si ![$i > j$](https://render.githubusercontent.com/render/math?math=%24i%20%3E%20j%24) ). Si se conocen los requisitos para cada tarea, da algún orden en el que se pueden llevar a cabo las tareas respetando los requisitos de cada una y la preferencia del jefe._

Para una mejor explicación del problema, vamos a dar un ejemplo. Digamos que tenemos un total de ![$n = 6$](https://render.githubusercontent.com/render/math?math=%24n%20%3D%206%24) tareas, y los requisitos de cada una se muestran en la tabla:
| Tareas        | Requisitos    
| :-------------: |:-------------:|
| 1    | 3, 5 |
| 2     | 1, 6      |
| 3 | - |
| 4 | 2 |
| 5 | - |
| 6 | 1 | 

Notemos que la tarea 1 tiene como requisitos a las tareas 3 y 5. Lo que esto quiere decir es que no podemos realizar la tarea 1 hasta que hayamos llevado a cabo la tarea 3 y la tarea 5.

En este caso, una de las maneras de llevar a cabo las tareas sería la siguiente. Hacemos la tarea 3, porque no tiene ningún requisito. Luego hacemos la tarea 5 por el mismo motivo. Como los requisitos de la tarea 1 son la 3 y la 5, y ya hicimos ambas tareas, hacemos la tarea 1. Luego la 6 porque ya llevamos a cabo la 1, luego la 2 porque ya hicimos la 1 y la 6 y por último hacemos la tarea 4. 

Si bien este orden funciona para la parte de los requisitos de cada tarea, no cumple con lo solicitado por el jefe. pues en el primer paso pudimos hacer la tarea 5 antes de la 3, pero no le dimos preferencia. De esta forma, la verdadera respuesta que deberíamos de dar para este caso es ![$5 \rightarrow 3 \rightarrow 1 \rightarrow 6 \rightarrow 2 \rightarrow 4$](https://render.githubusercontent.com/render/math?math=%245%20%5Crightarrow%203%20%5Crightarrow%201%20%5Crightarrow%206%20%5Crightarrow%202%20%5Crightarrow%204%24).

Ahora que conocemos el problema, trataremos de intuir una solución. 

---

Cuando vamos a comenzar, no tenemos de otra más que empezar por las tareas que no tienen requisitos. Revisamos todas las tareas y añadimos a una lista aquellas que no tengan requisitos. Ahora, como queremos darles prioridad a las tareas más importantes, la primera que vamos a llevar a cabo tiene que ser la que tenga el índice mayor de todas las de la lista. La buscamos, la hacemos y la eliminamos de nuestra lista. Una vez terminada, podemos tachar de la lista de requisitos de todas las tareas la tarea que acaba de ser llevada a cabo. Si al tachar dicho requisito alguna de las listas nos queda con todas sus tareas requisitos tachadas, eso significa que hemos realizado ya todas las tareas que eran requisito y, por lo tanto ya la podemos hacer, así que la añadiremos a la lista. De aquí es fácil intuir que repetiremos este proceso (escoger la tarea con mayor índice de la lista, hacerla y tacharla de las listas de requisitos e incluir en la lista las tareas que ya no tengan requisitos) hasta que todas las tareas hayan sido llevadas a cabo. 

La respuesta obtenida al llevar a cabo el proceso anterior es un orden topológico, y vamos a ver por qué. ¿Que no quedamos en que el orden topológico se aplica sólo en Gráficas Acíclicas Dirigidas? Lo que sucede es que en este problema hay un grafo implícito. Resulta que podemos modelar este problema utilizando un grafo con ![$n$](https://render.githubusercontent.com/render/math?math=%24n%24) vértices numerados del 1 al ![$n$](https://render.githubusercontent.com/render/math?math=%24n%24) —uno por cada tarea— y pondremos la arista ![$u \rightarrow v$](https://render.githubusercontent.com/render/math?math=%24u%20%5Crightarrow%20v%24) si la tarea ![$u$](https://render.githubusercontent.com/render/math?math=%24u%24) es requisito de la tarea ![$v$](https://render.githubusercontent.com/render/math?math=%24v%24). De esta manera, el grafo usado en el ejemplo descrito en la explicación del problema quedaría de la siguiente forma:

![Grafo del problema](https://ibin.co/5NEccNzNjo1P.png)

Podemos tener la seguridad de que el grafo obtenido de una entrada _válida_ de este problema será **acíclico**, porque no podemos tener ciclos de requisitos, y **dirigido**, por la forma en la que lo construimos.
El orden que nos solicitan en el problema es tal que antes de llevar a cabo una tarea hayamos completado todas sus tareas requisito. En el grafo que modelamos a partir del problema tenemos que existe la arista  ![$u \rightarrow v$](https://render.githubusercontent.com/render/math?math=%24u%20%5Crightarrow%20v%24) si la tarea ![$u$](https://render.githubusercontent.com/render/math?math=%24u%24) es requisito de la tarea ![$v$](https://render.githubusercontent.com/render/math?math=%24v%24). Como el orden topológico de un grafo es en el que el vértice ![$u$](https://render.githubusercontent.com/render/math?math=%24u%24) va antes que ![$v$](https://render.githubusercontent.com/render/math?math=%24v%24) si la arista  ![$u \rightarrow v$](https://render.githubusercontent.com/render/math?math=%24u%20%5Crightarrow%20v%24) existe, podemos concluir que el orden solicitado en el problema de la fábrica (y encontrado con el procedimiento descrito) es un orden topológico. Es importante notar que el orden que se nos solicita es uno en específico de los diversos ordenes topológicos que puede tener un grafo. 
Ahora sí, teniendo en la mente este problema y su relación con el orden topológico, pasemos a ver lo que es el algoritmo de Kahn para el orden topológico.

## Algoritmo de Kahn para el orden topológico

El proceso que intuimos en la sección anterior es justamente el algoritmo desarrollado por Arthur B. Kahn para obtener el orden topológico de redes de comunicaciones. En términos más formales, el algoritmo funciona de la siguiente manera:
Primero, tomamos todos aquellos vértices cuyo grado de entrada —la cantidad de aristas que apuntan hacia el nodo— sea igual a 0 (que es lo que hacemos al tomar todas las tareas que no tienen requisitos), los metemos a una estructura de datos (que es lo que hacemos cuando los anotamos en una lista), y mientras nuestra estructura no esté vacía, repetimos el procedimiento de extraer alguno de los elementos, eliminar todos los vértices que salen de ese nodo (que es lo mismo que tacharlo de todas las listas de requisitos) e insertar aquellos cuyo grado de entrada convierta en 0 (insertar a la lista los que se hayan quedado sin requisitos).

En este caso, a la hora de elegir el vértice (o la tarea) de la lista, necesitamos que sea el que tenga más prioridad. Si bien podríamos recorrer uno a uno los elementos de la lista en busca del mayor, hay una forma de hacerlo de manera que sea más eficiente, y es usando un [montículo](https://es.wikipedia.org/wiki/Mont%C3%ADculo_(inform%C3%A1tica)) (heap) como estructura de datos. Recordando, un montículo es un árbol binario que cumple la propiedad de que cada nodo es mayor que sus hijos. Lo que esta estructura nos permite es realizar tener siempre la lista de vértices ordenada, por el bajo costo de ![O(log n) ](https://render.githubusercontent.com/render/math?math=O(log%20n)%20) por inserción y extracción. Hacer esto nos permite mejorar la complejidad del algoritmo, de la que hablaremos más adelante. Una de las razones por las cuales este algoritmo es sumamente útil es que nos permite encontrar un orden topológico en particular con sólo cambiar la estructura de datos empleada, cosa que no es posible con otros métodos para obtener el orden topológico. 

El pseudocódigo del algoritmo es el siguiente:

``` 
Para cada vértice en el grafo 
	Si el grado de entrada es igual a 0
		Insertar vértice en el montículo
	Fin si
Fin para
Mientras el montículo no esté vacío
	Guardar el primer elemento del montículo en la respuesta
	Para cada vértice de grafo
		Si existe una arista entre el primer elemento del montículo y el vértice
			Eliminar la arista
			Si el grado de entrada del vértice es 0
				Insertar el vértice en el montículo
			Fin si
		Fin si
	Fin Para
	Eliminar el primer elemento del montículo 
Fin mientras 
```
La **complejidad** del algoritmo varía según la estructura de datos que se emplee y de la forma de representar el DAG. Utilizando un montículo tenemos una complejidad de **O((V+E)log(V))**, donde V es la cantidad de vértices y E la cantidad de aristas.
## Visualizador del algoritmo de Kahn para el Orden Topológico

Como ya se comentó, el Visualizador está construido en JavaScript con la ayuda de la librería **p5.js**. Su uso es bastante intuitivo, pues está basado en el problema que aquí describimos:
1. **Entra a la [página](https://arrobaricardoge.github.io/Kahn-TopoSort-Visual/) del visualizador**. ¡Lee las instrucciones! Es la forma más fácil de deducir su uso.
2. **Modela el grafo**. Lo puedes hacer presionando la tabla que se muestra para seleccionar los requisitos de cada tarea. Si no te sientes con la inspiración para hacerlo, puedes hacer que el visualizador genere una entrada válida por tí.
3. **Selecciona el tiempo de delay** de la simulación. Un delay más alto significa que la simulación irá más lento.
4. **Arranca la simulación** presionando _espacio_ o el botón destinado para ello. Puedes alternar entre el modo _**automático**_ y _**manual**_ con el botón **"Manual"** o la tecla _W_. Mientras estés en modo _**manual**_  la animación no avanzará hasta que presiones la _flecha derecha_ del teclado o de la pantalla.
5. Una vez que termine, puedes correr otra simulación reseteando el visualizador con el botón **"Resetear"** o presionando la tecla _R_.

## Enlaces de utilidad
[Conoce más sobre el algoritmo](https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/) (Artículo en GeeksforGeeks)

Líbrería [p5.js](https://p5js.org/)

[Dracula Theme](https://draculatheme.com/) (Tema para editores de texto, IDEs, consolas, que sirvió de inspiración para los colores del visualizador)



