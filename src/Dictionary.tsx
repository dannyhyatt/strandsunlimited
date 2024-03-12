import aWords from  "./assets/dictionary/a.json";
import bWords from "./assets/dictionary/b.json";
import cWords from "./assets/dictionary/c.json";
import dWords from "./assets/dictionary/d.json";
import eWords from "./assets/dictionary/e.json";
import fWords from "./assets/dictionary/f.json";
import gWords from "./assets/dictionary/g.json";
import hWords from "./assets/dictionary/h.json";
import iWords from "./assets/dictionary/i.json";
import jWords from "./assets/dictionary/j.json";
import kWords from "./assets/dictionary/k.json";
import lWords from "./assets/dictionary/l.json";
import mWords from "./assets/dictionary/m.json";
import nWords from "./assets/dictionary/n.json";
import oWords from "./assets/dictionary/o.json";
import pWords from "./assets/dictionary/p.json";
import qWords from "./assets/dictionary/q.json";
import rWords from "./assets/dictionary/r.json";
import sWords from "./assets/dictionary/s.json";
import tWords from "./assets/dictionary/t.json";
import uWords from "./assets/dictionary/u.json";
import vWords from "./assets/dictionary/v.json";
import wWords from "./assets/dictionary/w.json";
import xWords from "./assets/dictionary/x.json";
import yWords from "./assets/dictionary/y.json";
import zWords from "./assets/dictionary/z.json";

export class Dictionary {

    private dict: { [index: string]: {[index: string]: object} } ;

    constructor() {
        this.dict = {
            a: aWords,
            b: bWords,
            c: cWords,
            d: dWords,
            e: eWords,
            f: fWords,
            g: gWords,
            h: hWords,
            i: iWords,
            j: jWords,
            k: kWords,
            l: lWords,
            m: mWords,
            n: nWords,
            o: oWords,
            p: pWords,
            q: qWords,
            r: rWords,
            s: sWords,
            t: tWords,
            u: uWords,
            v: vWords,
            w: wWords,
            x: xWords,
            y: yWords,
            z: zWords
        }
    }

    public isWord(s: string): boolean {
        if (s.length >= 4) {
            const first = s.substring(0, 1).toLowerCase();
            const found = this.dict[first][s.toLowerCase()];
            console.log(found);
            return found != undefined;
        }
        return false;
    }
}