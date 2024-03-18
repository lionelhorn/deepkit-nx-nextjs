import {DatabaseSession, onDatabaseError} from "@deepkit/orm";
import {eventDispatcher} from "@deepkit/event";

export class DbEventsListener {
  events: Array<any> = []
  errorEvents: Array<any> = []

  @eventDispatcher.listen(onDatabaseError)
  async onDatabaseError(event: typeof onDatabaseError.event) {
    this.errorEvents.push(event)
  }

  @eventDispatcher.listen(DatabaseSession.onCommitPre)
  async onCommitPre(event: typeof DatabaseSession.onCommitPre.event) {
    this.events.push(event)
  }

  @eventDispatcher.listen(DatabaseSession.onInsertPost)
  async onInsertPost(event: typeof DatabaseSession.onInsertPost.event) {
    this.events.push(event)
  }

  @eventDispatcher.listen(DatabaseSession.onInsertPre)
  async onInsertPre(event: typeof DatabaseSession.onInsertPre.event) {
    this.events.push(event)
  }
}
