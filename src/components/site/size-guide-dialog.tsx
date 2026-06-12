import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const womenSizes = [
  ["XS", "32", "76", "60", "86"],
  ["S",  "34", "80", "64", "90"],
  ["M",  "36", "84", "68", "94"],
  ["L",  "38", "90", "74", "100"],
  ["XL", "40", "96", "80", "106"],
];

const menSizes = [
  ["S",  "36", "92",  "76", "94"],
  ["M",  "38", "96",  "80", "98"],
  ["L",  "40", "102", "86", "104"],
  ["XL", "42", "108", "92", "110"],
  ["XXL","44", "114", "98", "116"],
];

const kidsSizes = [
  ["2Y", "92",  "53", "49"],
  ["3Y", "98",  "55", "51"],
  ["4Y", "104", "57", "53"],
  ["5Y", "110", "59", "55"],
  ["6Y", "116", "61", "57"],
  ["7Y", "122", "63", "59"],
];

export function SizeGuideDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Size Guide</DialogTitle>
          <DialogDescription>All measurements in centimetres. For best fit, measure over light clothing.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="women" className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="women">Women</TabsTrigger>
            <TabsTrigger value="men">Men</TabsTrigger>
            <TabsTrigger value="kids">Kids</TabsTrigger>
          </TabsList>

          <TabsContent value="women">
            <SizeTable head={["Size", "EU", "Bust", "Waist", "Hips"]} rows={womenSizes} />
          </TabsContent>
          <TabsContent value="men">
            <SizeTable head={["Size", "Collar", "Chest", "Waist", "Hips"]} rows={menSizes} />
          </TabsContent>
          <TabsContent value="kids">
            <SizeTable head={["Size", "Height", "Chest", "Waist"]} rows={kidsSizes} />
          </TabsContent>
        </Tabs>

        <div className="mt-4 rounded-md bg-surface-warm p-4 text-xs leading-relaxed text-ink-soft">
          <p className="font-medium text-ink">How to measure</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            <li><strong>Bust/Chest:</strong> Around the fullest part, keeping the tape level.</li>
            <li><strong>Waist:</strong> Around the natural waistline, the narrowest part of your torso.</li>
            <li><strong>Hips:</strong> Around the fullest part of your hips, about 20cm below the waist.</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SizeTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface-warm">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left font-medium text-ink-soft eyebrow">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
