export class Message {

    constructor(public text: string,
                public error: boolean = false,
                // tslint:disable-next-line: variable-name
                public responses?: [string, (string) => void][]) { }
}
