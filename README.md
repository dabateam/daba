# README

Welcome to daba.

We are building the simplest suite of tools to help you ship your projects faster. We are still in alpha, so things may change and your data might be lost.

# Installation

```jsx
npm install daba
```

or

```jsx
yarn install daba
```

First thing to do is to call the setup function somewhere in your code (make sure the setup is done **before** you start using other functions)

```jsx
import { setup } from "daba"

setup({
	projectId: 'your_project_id'
	secret: "*************"
})
```

(You can fetch the project id and secret from the daba.so db dashboard)

# Fetching data

Use the `get` function to fetch the value of a key. Your key could be nested, or even specific element in an array.

```jsx
const value = await get("my_key_here");
```

More details

```jsx
import { get } from "daba";

// using await -- make sure it is inside an async function

const value = await get("my_key_here");

// using promises

get("my_key_here").then(function (value) {
  console.log(value);
});

// nested data

const value = await get("my_key_here.nested_value.my_list[6]");
```

# Updating data

Use the `set` function to either create a key or update an existing key. Provide the path of the key as a first argument, and the value (javascript object / JSON) as the second argument.

```jsx
set("my_key", myValue);
```

More details:

```jsx
import { set } from "daba";

const valueToSet = { hello: "world", bonjour: "le monde" };

set("my_key_here", valueToSet);

// using promises

set("my_key_here", valueToSet).then(function () {
  console.log("updated successfully");
});

// nested data

set("my_key_here.nested_value.my_list[6]", valueToSet);
```

# Removing data

Use the `remove` function to delete a key. Your key could be nested, or even specific element in an array.

```jsx
remove("my_key_here");
```

More details:

```jsx
import { remove } from "daba";

remove("my_key_here");

// using promises

remove("my_key_here").then(function () {
  console.log("removed successfully!");
});

// nested data

remove("my_key_here.nested_value.my_list[6]");
```
