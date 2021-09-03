/** An abstract top class representing in game content
 *
 * This class should not be instantiated
 */
export abstract class Content {}

/** An abstract top class representing idetifiable in game content
 *
 * This class should not be instantiated
 */
export abstract class MappableContent extends Content {
  abstract name: string

  override toString(): string {
    return this.name
  }
}

/** An abstract top class representing unlockable in game content
 *
 * This class should not be instantiated
 */
export abstract class UnlockableContent extends MappableContent {}
