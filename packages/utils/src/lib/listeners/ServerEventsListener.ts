import {eventDispatcher} from "@deepkit/event";
import {onServerMainBootstrapDone, onServerShutdown} from "@deepkit/framework";

class ServerEventsListener {
  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onMainBoostrap() {
  }

  @eventDispatcher.listen(onServerShutdown)
  onServerShutdown() {
  }
}
