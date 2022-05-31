// app.routing.ts 作为整个 Express App 的路由集束点
// 为什么不是在 App 做集束呢？因为 App 本身的工作不是在定义路由上，是在做 Express App 的相关设置，这样能够切割的较干净

import { RouteBase } from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';
import { AuthRoute } from './main/auth/auth.routing';
export class AppRoute extends RouteBase {

    // public apiRoute = new ApiRoute();
    private apiRoute!: ApiRoute;
    private authRoute!: AuthRoute;
    
    constructor(){
        super();
    }
    protected initial(): void {
        this.apiRoute = new ApiRoute();
        this.authRoute = new AuthRoute();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.use('/api', (new ApiRoute()).router)
        this.router.use('/auth', this.authRoute.router);
    }
    }

}