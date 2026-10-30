import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, Share2, QrCode, Globe, Download } from 'lucide-react';

export const ShareTripModal: React.FC = () => {
  const { isShareTripModalOpen, setShareTripModalOpen, tripToShare, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareTripModalOpen || !tripToShare) return null;

  const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(tripToShare))))}`;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shareUrl); } catch { showToast('Copy the link from the text field manually.', 'warning'); return; }
    setCopied(true);
    showToast('Trip itinerary share link copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportText = () => {
    const textLines = [
      `TRAVELVERSE ITINERARY — ${tripToShare.title}`,
      `Destination: ${tripToShare.destinationName}, ${tripToShare.country}`,
      `Duration: ${tripToShare.durationDays} Days (${tripToShare.startDate} to ${tripToShare.endDate})`,
      `Budget: $${tripToShare.totalBudget} USD (Spent: $${tripToShare.spentBudget})`,
      `Share Code: ${tripToShare.shareableCode}`,
      '',
      '--- DAY BY DAY SCHEDULE ---'
    ];

    tripToShare.days.forEach(day => {
      textLines.push(`\nDAY ${day.dayNumber}: ${day.title} (${day.date})`);
      if (day.activities.length === 0) {
        textLines.push('  No activities scheduled yet.');
      } else {
        day.activities.forEach(act => {
          textLines.push(`  ${act.time} — ${act.title} (${act.location}) - $${act.cost}`);
          if (act.notes) textLines.push(`     Notes: ${act.notes}`);
        });
      }
    });

    const blob = new Blob([textLines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tripToShare.title.replace(/\s+/g, '_')}_Itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Itinerary exported as text document', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#0B1320]/15 shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0B1320]/10 flex items-center justify-between bg-[#F5F3EE]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#D8A84E]" />
            <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
              Share Journey
            </h3>
          </div>
          <button
            onClick={() => setShareTripModalOpen(false)}
            aria-label="Close"
            className="p-1 text-[#6B7280] hover:text-[#0B1320] rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Trip Summary Preview */}
          <div className="bg-[#F5F3EE] p-4 rounded-xl border border-[#0B1320]/10 flex gap-3.5 items-center">
            <img
              src={tripToShare.coverImage}
              alt={tripToShare.title}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-lg object-cover bg-slate-300 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-bold font-editorial text-[#0B1320] truncate">
                {tripToShare.title}
              </h4>
              <p className="text-xs text-[#6B7280]">
                {tripToShare.destinationName} · {tripToShare.durationDays} Days · ${tripToShare.totalBudget}
              </p>
              <span className="text-[11px] font-mono text-[#D8A84E] font-semibold">
                Code: {tripToShare.shareableCode}
              </span>
            </div>
          </div>

          {/* Share Link Box */}
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Public Itinerary Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 text-xs bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl px-3 py-2.5 text-[#0B1320] focus:outline-hidden font-mono truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D8A84E]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6B7280]">This link contains a snapshot of your itinerary, including notes. Anyone with the link can open and save it. Later edits are not synced.</p>

          {/* Export Action */}
          <button
            onClick={handleExportText}
            className="w-full py-2.5 border border-[#0B1320]/20 hover:bg-[#0B1320]/5 text-[#0B1320] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-[#6B7280]" />
            <span>Download Itinerary Summary (.txt)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
