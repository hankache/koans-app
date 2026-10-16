def primes_up_to(n):
    is_prime = [True] * (n + 1)
    is_prime[0:2] = [False, False]
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            is_prime[i * i :: i] = [False] * len(is_prime[i * i :: i])
    return [i for i, p in enumerate(is_prime) if p]


assert primes_up_to(20) == [2, 3, 5, 7, 11, 13, 17, 19], 'the primes up to 20'
assert len(primes_up_to(100)) == 25, 'how many up to 100'
assert sum(primes_up_to(10)) == 17, 'the sum of those up to 10'
assert primes_up_to(1) == [], 'none below 2'
