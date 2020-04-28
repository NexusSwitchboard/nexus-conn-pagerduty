import { Connection, ConnectionConfig, GlobalConfig } from "@nexus-switchboard/nexus-extend";
import debug from "debug";
import Client from "node-pagerduty";
export const logger = debug("nexus:pagerduty");

export interface IPagerDutyConfig {
    token: string;
    serviceDefault: string;
    escalationPolicyDefault: string;
}

export class PagerDutyConnection extends Connection {
    public name = "PagerDuty";
    public config: IPagerDutyConfig;
    public api: Client;

    public connect(): PagerDutyConnection {
        this.api = new Client(this.config.token);
        return this;
    }

    public disconnect(): boolean {
        return true;
    }
}

export default function createConnection(cfg: ConnectionConfig, globalCfg: GlobalConfig): Connection {
    return new PagerDutyConnection(cfg, globalCfg);
}
