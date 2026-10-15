<?php
$lang = 'PHP';
$text = <<<END
    Learning $lang
      one koan at a time
    END;
assertSame("Learning PHP\n  one koan at a time", $text, "the closing marker's indentation is removed");
$raw = <<<'END'
    Cost: $5
    END;
assertSame('Cost: $5', $raw, 'a nowdoc does not interpolate');
