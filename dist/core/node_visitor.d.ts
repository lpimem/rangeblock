import { NodeContext } from './node_context';
export interface NodeVisitor {
    (n: Node, ctx: NodeContext, start: number, end: number): void;
}
