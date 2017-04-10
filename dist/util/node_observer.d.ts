export declare class NodeObserver {
    constructor(n: Node, callback: MutationCallback, options?: MutationObserverInit);
    start(options?: MutationObserverInit): void;
    stop(): MutationRecord[];
    private createOb(callback);
    private m_node;
    private m_ob;
}
