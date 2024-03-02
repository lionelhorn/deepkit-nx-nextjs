import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App} from '@deepkit/app';
import {FrameworkModule, onServerMainBootstrapDone} from '@deepkit/framework';
import {LoggerInterface} from "@deepkit/logger";
import {eventDispatcher} from "@deepkit/event";

class Bootstrap {
	constructor(private logger: LoggerInterface) {
	}

	@eventDispatcher.listen(onServerMainBootstrapDone)
	onMainBoostrap() {
		console.log("onServerMainBootstrapDone")
	}
}


const app = new App({
	providers: [],
	listeners: [Bootstrap],
	controllers: [],
	imports: [
		new FrameworkModule({debug: true}),
		new ApiConsoleModule({
			path: '/api'
		}),
	]
});


app.loadConfigFromEnv({prefix: 'APP_'})
	.run(["server:start"]);
