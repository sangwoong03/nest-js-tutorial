# Nest.js Toturial

This reopository is toturial for Nest.js framework.


## Requirements

- Install @nestjs/cli

    ```shell
    $ npm install -g @nestjs/cli
    ```

- Make new project

    ```shell
    $ nest new project-name
    ```
    
## Architecture

```
    src
    |___ app.controller.ts
    |___ app.module.ts
    |___ app.service.ts
    |___ main.ts
```

- Bootstraping for executing Application server
    - `main.ts`

- Root Module for whole Application, including sub modules.
    - `app.module.ts`

- Sub Modules for each services making up actual API.  
You can customize your sub modules for your application.
    - *Module
    - *Controller :: You can handle input and output of data.
    - *Service :: You can handle business logic or query to Database.
    - Enitity ::
    - Dto ::