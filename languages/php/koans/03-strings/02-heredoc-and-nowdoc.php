// title: Heredoc and nowdoc
// intro: A heredoc, `<<<END`, writes a multi-line string that interpolates; a nowdoc, `<<<'END'`, one that doesn't. The closing marker's indentation is removed from every line.
<?php
$lang = 'PHP';
$text = <<<END
    Learning $lang
      one koan at a time
    END;
assertSame(___, $text, "the closing marker's indentation is removed");
$raw = <<<'END'
    Cost: $5
    END;
assertSame(___, $raw, 'a nowdoc does not interpolate');
