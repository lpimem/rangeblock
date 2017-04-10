import { clearSelection, getSelectedRange } from '../util/dom_helper';
import { generateRandomUUID } from '../util/id_helper';
import { Block } from './block';
import { computeDimentions } from './node_measure';
import { RangeCache } from './range_cache';
import { restoreRangeCache } from './range_helper';
import { RangeMeta } from './range_meta';
import { debug } from 'logez';


/**
 * Detect if the given window has a expanded selection range.
 * Return a Block object containing the dimension information
 * of the range or null.
 * 
 * @param win window object to extract selection
 * @param doc document object of the window
 * @param id [optional] if present, use it as the
 * Block object's id; otherwise generate a random uuid.
 */
export function extractSelectedBlock(
    win: Window, doc: Document, id?: string): Block {
  let range: Range = getSelectedRange(win);
  if (null == range || range.collapsed) {
    debug('no selected range detected.');
    return null;
  }
  let rc = RangeCache.make(doc, range);
  clearSelection(win);
  return generateBlock(doc, rc, id);
}

/**
 * Rebuild a block using given metadata. 
 * 
 * @param win window object to extract selection
 * @param doc document object of the window
 * @param meta metadata used to restore the block. See @class{RangeMeta}
 * @param id [optional] if present, use it as the
 * Block object's id; otherwise generate a random uuid.
 */
export function restoreBlock(win: Window, doc: Document, meta: RangeMeta, id?:string): Block{
  let rc = restoreRangeCache(doc, meta);
  return generateBlock(doc, rc, id);
}

function generateBlock(doc: Document, rangeCache: RangeCache, id?: string): Block{
  let dims = computeDimentions(doc, rangeCache);
  if (!id) {
    id = generateRandomUUID();
  }
  return new Block(id, rangeCache, dims);
}


