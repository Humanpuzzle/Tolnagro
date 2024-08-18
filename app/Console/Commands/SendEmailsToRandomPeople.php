<?php

namespace App\Console\Commands;

use App\Models\MailList;
use Illuminate\Console\Command;
use App\Mail\RandomPeopleEmail;
use App\Models\Logmail;
use App\Models\MailPocket;
use Illuminate\Support\Facades\Mail;


class SendEmailsToRandomPeople extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-random';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send emails to 3 random people every minute';

    /**
     * Execute the console command.
     * 
     * @return int
     */
    public function handle()
    {
        while (true) {
        // Fetch 3 random users from the database
        $users = MailList::inRandomOrder()->take(3)->get();
        $mails = MailPocket::all();

            foreach ($users as $user) {

                foreach ($mails as $k => $m) {
                    // Define the content of the email
                    $body = "<p>Hello {$m->name}, ez egy random email!</p><p>{$m->content}</p>";                
                    // Send the email
                    Mail::to($user->email)->send(new RandomPeopleEmail($body));
                    
                    // Log sent out mails
                    $data = [
                        'mailListId' => $user->id,
                        'mailPocketId' => $m->id,
                    ];
                    Logmail::create($data);
                }
                
            }
            sleep(60);
        }

        $this->info('Emails have been sent to 3 random users.');

        return Command::SUCCESS;
    }
}
