<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Logmail;
use App\Models\MailPocket;
use Illuminate\Support\Facades\DB;


class MailController extends Controller
{
    public function index()
    {
        // Fetch the latest posts, you can customize the query as needed
        $mails = MailPocket::orderBy('created_at', 'desc')->get();
        
        // Fetch sent out mail log to count the sent out amount

        // SELECT COUNT(l.mailPocketId) AS 'sentout', l.mailPocketId FROM logmails l GROUP BY l.mailPocketId
        // $sentMails = Logmail::all();
        // $sentMailsCount = $sentMails->count();
        $sentMails = DB::table('logmails')
                        ->groupBy('mailPocketId')
                        ->select('mailPocketId', DB::raw('count(*) as num'))
                        ->get();

        foreach ($mails as $k => $v) {
            $mails[$k]['content'] = $this->trimWords($v['content']);
            foreach ($sentMails as $ks => $s) {
                if ($s->mailPocketId === $v->id) {
                    $mails[$k]['sentout'] = $s->num;
                }
            }
        }
        return response()->json($mails);
    }

    public function destroy($id)
    {
        $mail = MailPocket::find($id);

        if (!$mail) {
            return response()->json(['message' => 'Mail not found'], 404);
        }

        $mail->delete();

        return response()->json(['message' => 'Mail deleted successfully']);
    }


    public function trimWords($text, $limit = 5) {
        // $limit = rand(2,8);
        // Split the text into an array of words
        $words = explode(' ', $text);
    
        // If the number of words is less than or equal to the limit, return the original text
        if (count($words) <= $limit) {
            return $text;
        }
    
        // Slice the array to include only the first $limit words
        $trimmedWords = array_slice($words, 0, $limit);
    
        // Join the words back into a string and append "..."
        return implode(' ', $trimmedWords) . '...';
    }
}
